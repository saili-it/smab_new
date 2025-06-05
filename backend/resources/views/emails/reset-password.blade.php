<x-mail::message>
# Reset Password Request

You are receiving this email because we received a password reset request for your account.

<x-mail::button :url="$resetUrl">
Reset Password
</x-mail::button>

If you did not request a password reset, no further action is required.

This password reset link will expire in 60 minutes.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
