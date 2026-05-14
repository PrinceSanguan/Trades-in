<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Prevent your site from being iframed by other domains (clickjacking)
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');

        // Prevent MIME-type sniffing
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        // Enable XSS browser protection
        $response->headers->set('X-XSS-Protection', '1; mode=block');

        // Force HTTPS for 1 year once on HTTPS
        $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

        // Don't send the full referrer URL to third parties
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        // Permissions policy — disable features not needed
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

        // Only apply strict CSP in production — Vite dev server needs loose policy locally
        if (app()->isProduction()) {
            $response->headers->set('Content-Security-Policy', implode('; ', [
                "default-src 'self'",
                "script-src 'self' 'unsafe-inline' https://link.msgsndr.com https://www.google.com https://www.gstatic.com",
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                "font-src 'self' https://fonts.gstatic.com",
                "img-src 'self' data: https:",
                "frame-src https://api.leadconnectorhq.com https://www.google.com",
                "connect-src 'self' https://api.leadconnectorhq.com https://link.msgsndr.com",
                "object-src 'none'",
                "base-uri 'self'",
                "form-action 'self' https://api.leadconnectorhq.com",
            ]));
        }

        return $response;
    }
}
