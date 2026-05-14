<?php

/**
 * Quick test script to verify concurrent webhook performance
 * Run: php test_concurrent_webhooks.php
 */

require __DIR__ . '/vendor/autoload.php';

use Illuminate\Support\Facades\Http;

// Bootstrap Laravel
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "🚀 Testing Concurrent Webhook Performance\n";
echo "==========================================\n\n";

$testLead = [
    'name' => 'Test User',
    'email' => 'test@example.com',
    'phone' => '+447700900000',
    'postcode' => 'SW1A 1AA',
    'service' => 'marketing-lead',
    'source' => 'performance-test',
];

$sessionId = (string) \Illuminate\Support\Str::uuid();
$verificationCode = (string) random_int(1000, 9999);

echo "📊 Test Parameters:\n";
echo "- Session ID: {$sessionId}\n";
echo "- Verification Code: {$verificationCode}\n\n";

// Test 1: Sequential (OLD WAY - SLOW)
echo "⏱️  Test 1: Sequential Webhooks (OLD WAY)\n";
$startSequential = microtime(true);

try {
    $googleSheetsUrl = config('services.google_sheets.web_app_url');
    if ($googleSheetsUrl) {
        Http::timeout(2)->post($googleSheetsUrl, [
            'secret' => config('services.google_sheets.secret'),
            'timestamp' => now()->toIso8601String(),
            ...$testLead,
        ]);
    }
    
    $ghlUrl1 = config('services.ghl.webhook_url');
    if ($ghlUrl1) {
        Http::timeout(2)->post($ghlUrl1, [
            'event' => 'lead_submitted',
            'verified' => false,
            'session_id' => $sessionId,
            'verification_code' => $verificationCode,
            'timestamp' => now()->toIso8601String(),
            ...$testLead,
        ]);
    }
} catch (\Throwable $e) {
    echo "❌ Sequential test error: {$e->getMessage()}\n";
}

$durationSequential = round((microtime(true) - $startSequential) * 1000);
echo "✅ Sequential completed in: {$durationSequential}ms\n\n";

// Wait a bit between tests
sleep(1);

// Test 2: Concurrent (NEW WAY - FAST)
echo "⚡ Test 2: Concurrent Webhooks (NEW WAY)\n";
$startConcurrent = microtime(true);

try {
    $responses = Http::pool(function ($pool) use ($testLead, $sessionId, $verificationCode) {
        $googleSheetsUrl = config('services.google_sheets.web_app_url');
        if ($googleSheetsUrl) {
            $pool->asJson()
                ->withOptions([
                    'allow_redirects' => [
                        'max' => 5,
                        'strict' => true,
                        'referer' => true,
                        'protocols' => ['https'],
                        'track_redirects' => false,
                    ],
                ])
                ->timeout(2)
                ->post($googleSheetsUrl, [
                    'secret' => config('services.google_sheets.secret'),
                    'timestamp' => now()->toIso8601String(),
                    ...$testLead,
                ]);
        }

        $ghlUrl1 = config('services.ghl.webhook_url');
        if ($ghlUrl1) {
            $pool->timeout(2)->post($ghlUrl1, [
                'event' => 'lead_submitted',
                'verified' => false,
                'session_id' => $sessionId,
                'verification_code' => $verificationCode,
                'timestamp' => now()->toIso8601String(),
                ...$testLead,
            ]);
        }
    });
} catch (\Throwable $e) {
    echo "❌ Concurrent test error: {$e->getMessage()}\n";
}

$durationConcurrent = round((microtime(true) - $startConcurrent) * 1000);
echo "✅ Concurrent completed in: {$durationConcurrent}ms\n\n";

// Results
echo "📈 Performance Comparison:\n";
echo "==========================================\n";
echo "Sequential (OLD):  {$durationSequential}ms\n";
echo "Concurrent (NEW):  {$durationConcurrent}ms\n";

if ($durationSequential > $durationConcurrent) {
    $improvement = round(($durationSequential / $durationConcurrent), 1);
    $saved = $durationSequential - $durationConcurrent;
    echo "\n🚀 Speed Improvement: {$improvement}x faster!\n";
    echo "⏱️  Time Saved: {$saved}ms per form submission\n";
} else {
    echo "\n⚠️  Note: Results may vary depending on network conditions\n";
}

echo "\n✅ Test complete! Check storage/logs/laravel.log for webhook details.\n";
