<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <style>
        body {
            font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
            line-height: 1.7;
            color: #000;
            background-color: #fff;
            margin: 0;
            padding: 0;
        }

        .email-wrapper {
            max-width: 600px;
            margin: 30px auto;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #000;
        }

        .email-header {
            background-color: #fff;
            color: #000;
            padding: 30px;
            text-align: center;
            border-bottom: 1px solid #000;
        }

        .logo-placeholder {
            width: 70px;
            height: 70px;
            background-color: #fff;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #000;
            font-size: 24px;
            border: 1px solid #000;
        }

        .email-header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }

        .email-header p {
            margin: 10px 0 0;
            font-size: 16px;
            font-weight: 300;
        }

        .email-body {
            background-color: #fff;
            padding: 35px;
        }

        .greeting {
            font-size: 18px;
            font-weight: 500;
            color: #000;
            margin-bottom: 20px;
        }

        .message {
            color: #000;
            font-size: 16px;
        }

        .message p {
            margin-bottom: 20px;
        }

        .highlight {
            background-color: #fff;
            border-left: 4px solid #000;
            padding: 15px 20px;
            margin: 25px 0;
            border-radius: 0 6px 6px 0;
            font-style: italic;
        }

        .cta-button {
            display: inline-block;
            background-color: #000;
            color: #fff;
            padding: 12px 28px;
            margin: 20px 0;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
        }

        .signature {
            margin-top: 35px;
            padding-top: 25px;
            border-top: 1px solid #000;
            font-size: 15px;
        }

        .name {
            font-weight: 600;
            color: #000;
            font-size: 16px;
        }

        .role {
            color: #000;
            font-weight: 500;
            margin-top: 5px;
        }

        .email-footer {
            background-color: #fff;
            padding: 20px;
            text-align: center;
            font-size: 13px;
            color: #000;
            border-top: 1px solid #000;
        }
    </style>
</head>

<body>
    <div class="email-wrapper">

        <div class="email-body">
            <div class="greeting">Hello {{ $user->name }},</div>

            <div class="message">
                <p>Welcome — we’re glad you’re here.</p>

                <div class="highlight">
                    “If you have questions or need help getting started, reply to this email — we read every message.”
                </div>

                <p>Here’s what you can do next:</p>
                <ul>
                    <li>Explore your dashboard and update your profile.</li>
                    <li>Review settings and configure your preferences.</li>
                    <li>Reach out if you need anything — we’re happy to help.</li>
                </ul>
            </div>

            <div class="signature">
                <div class="name">The Team</div>
                <div class="role">Support</div>
            </div>
        </div>

        <div class="email-footer">
            <p>This email was sent to {{ $user->email }}</p>
            <p>&copy; {{ date('Y') }} {{ config('app.name') }}</p>
        </div>
    </div>
</body>

</html>
