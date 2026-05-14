<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the homepage.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Welcome');
    }

    /**
     * Display the thank you page.
     *
     * @return \Inertia\Response
     */
    public function thankYou(Request $request)
    {
        return Inertia::render('ThankYou', [
            'sessionId' => $request->query('session_id'),
            'phoneHint' => $request->query('phone_hint'),
            'verified' => $request->query('verified') === 'true',
            // GHL form redirect params for conversion tracking
            'email' => $request->query('email', ''),
            'first_name' => $request->query('first_name', ''),
            'phone' => $request->query('phone', ''),
        ]);
    }
}
