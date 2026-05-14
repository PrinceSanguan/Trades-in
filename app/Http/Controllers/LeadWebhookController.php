<?php

namespace App\Http\Controllers;

use App\Jobs\SendUnverifiedLeadToWebhooks;
use App\Services\LeadWebhookService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class LeadWebhookController extends Controller
{
    public function __construct(
        private readonly LeadWebhookService $service,
    ) {
    }

    /**
     * Stage 1: form submission.
     * - Google Sheets (immediate)
     * - GHL webhook #1 (unverified)
     * - create verification session (cache, 5 min)
     * - dispatch timeout job (5 min)
     */
    public function initiateVerification(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:32'],
            'postcode' => ['nullable', 'string', 'max:32'],
            'service' => ['nullable', 'string', 'max:100'],
            'source' => ['nullable', 'string', 'max:100'],
        ]);

        $sessionId = (string) Str::uuid();
        $verificationCode = (string) random_int(1000, 9999);

        $lead = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'postcode' => $validated['postcode'] ?? '',
            'service' => $validated['service'] ?? 'marketing-lead',
            'source' => $validated['source'] ?? 'landing-page',
        ];

        // 🚀 FAST: Fire all webhooks concurrently (in parallel) - THE KEY!
        // Instead of 2s + 2s + 2s = 6s sequential, we get max(2s, 2s, 2s) = ~2s parallel
        // No queue worker needed - works on any hosting!
        $this->service->sendWebhooksConcurrently($lead, $sessionId, $verificationCode);

        $cacheKey = "lead_verification:{$sessionId}";

        Cache::put($cacheKey, [
            'lead' => $lead,
            'code' => $verificationCode,
            'verified' => false,
            'created_at' => now()->toIso8601String(),
        ], now()->addMinutes(5));

        SendUnverifiedLeadToWebhooks::dispatch($sessionId)->delay(now()->addMinutes(5));

        Log::info('Lead verification initiated', ['session_id' => $sessionId, 'email' => $lead['email']]);

        return response()->json([
            'success' => true,
            'session_id' => $sessionId,
            'message' => 'Verification code sent',
        ]);
    }

    /**
     * Stage 2: verification success.
     * Sends GHL webhook #2 (verified=true) and clears cache.
     */
    public function verifyCode(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'session_id' => ['required', 'uuid'],
            'code' => ['required', 'string', 'size:4'],
        ]);

        $cacheKey = "lead_verification:{$validated['session_id']}";
        $sessionData = Cache::get($cacheKey);

        if ($sessionData === null) {
            return response()->json([
                'success' => false,
                'message' => 'Verification session expired. Please resubmit the form.',
            ], 410);
        }

        if (($sessionData['verified'] ?? false) === true) {
            return response()->json([
                'success' => true,
                'message' => 'Already verified',
            ]);
        }

        if (!hash_equals((string) ($sessionData['code'] ?? ''), (string) $validated['code'])) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid verification code',
            ], 422);
        }

        $lead = $sessionData['lead'] ?? [];

        $this->service->sendToGhlWebhook2($lead, $validated['session_id'], true, null);

        Cache::forget($cacheKey);
        Log::info('Lead verified; cache cleared', ['session_id' => $validated['session_id']]);

        return response()->json([
            'success' => true,
            'message' => 'Verified',
        ]);
    }

    /**
     * Stage 3: resend code.
     * Does NOT call webhook #1 again. Does not send webhook #2.
     */
    public function resendCode(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'session_id' => ['required', 'uuid'],
        ]);

        $cacheKey = "lead_verification:{$validated['session_id']}";
        $sessionData = Cache::get($cacheKey);

        if ($sessionData === null) {
            return response()->json([
                'success' => false,
                'message' => 'Verification session expired. Please resubmit the form.',
            ], 410);
        }

        if (($sessionData['verified'] ?? false) === true) {
            return response()->json([
                'success' => true,
                'message' => 'Already verified',
            ]);
        }

        $newCode = (string) random_int(1000, 9999);
        $lead = $sessionData['lead'] ?? [];

        Cache::put($cacheKey, [
            ...$sessionData,
            'code' => $newCode,
        ], now()->addMinutes(5));

        if (!empty($lead['phone'])) {
            $this->service->sendVerificationSms((string) $lead['phone'], $newCode);
        }

        Log::info('Verification code resent', ['session_id' => $validated['session_id']]);

        return response()->json([
            'success' => true,
            'message' => 'Code resent',
        ]);
    }

    /**
     * Server-side Meta Conversions API (Lead event).
     * Triggered from Thank You page so sensitive access token stays on backend.
     */
    public function trackMetaLead(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:32'],
        ]);

        $pixelId = (string) config('services.meta.pixel_id');
        $accessToken = (string) config('services.meta.access_token');
        $testEventCode = (string) config('services.meta.test_event_code');

        if ($pixelId === '' || $accessToken === '') {
            Log::warning('Meta CAPI skipped: missing config', [
                'has_pixel_id' => $pixelId !== '',
                'has_access_token' => $accessToken !== '',
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Meta CAPI is not configured.',
            ], 503);
        }

        $email = isset($validated['email']) ? trim(strtolower((string) $validated['email'])) : '';
        $phone = isset($validated['phone']) ? preg_replace('/\D+/', '', (string) $validated['phone']) : '';

        $userData = [
            'em' => $email !== '' ? [hash('sha256', $email)] : [],
            'ph' => $phone !== '' ? [hash('sha256', $phone)] : [null],
        ];

        $payload = [
            'data' => [[
                'event_name' => 'Lead',
                'event_time' => now()->timestamp,
                'action_source' => 'website',
                'user_data' => $userData,
                'original_event_data' => [
                    'event_name' => null,
                ],
            ]],
        ];

        if ($testEventCode !== '') {
            $payload['test_event_code'] = $testEventCode;
        }

        $url = sprintf('https://graph.facebook.com/v20.0/%s/events', $pixelId);
        $response = Http::asJson()
            ->timeout(10)
            ->post($url, [
                ...$payload,
                'access_token' => $accessToken,
            ]);

        if (!$response->successful()) {
            Log::error('Meta CAPI lead request failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Meta CAPI request failed.',
            ], 502);
        }

        return response()->json([
            'success' => true,
            'meta' => $response->json(),
        ]);
    }

    /**
     * Stage 3 alternative: user closes modal.
     * Sends GHL webhook #2 (verified=false, reason=modal_closed) and clears cache.
     */
    public function closeWithoutVerification(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'session_id' => ['required', 'uuid'],
        ]);

        $cacheKey = "lead_verification:{$validated['session_id']}";
        $sessionData = Cache::get($cacheKey);

        if ($sessionData === null) {
            return response()->json([
                'success' => true,
                'message' => 'Session already closed/expired',
            ]);
        }

        if (($sessionData['verified'] ?? false) === true) {
            Cache::forget($cacheKey);
            return response()->json([
                'success' => true,
                'message' => 'Already verified',
            ]);
        }

        $lead = $sessionData['lead'] ?? [];
        $this->service->sendToGhlWebhook2($lead, $validated['session_id'], false, 'modal_closed');

        Cache::forget($cacheKey);
        Log::info('Verification modal closed; outcome sent; cache cleared', ['session_id' => $validated['session_id']]);

        return response()->json([
            'success' => true,
            'message' => 'Closed',
        ]);
    }
}
