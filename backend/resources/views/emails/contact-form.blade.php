<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SMAB Contact Form Message</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        .email-wrapper {
            background-color: #f4f4f4;
            padding: 20px;
        }
        .email-content {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .email-header {
            background-color: #e63812;
            padding: 20px;
            text-align: center;
        }
        .email-header img {
            max-width: 200px;
            height: auto;
        }
        .email-body {
            padding: 30px;
            color: #333333;
        }
        .message-info {
            background-color: #f8f8f8;
            border-left: 4px solid #e63812;
            padding: 15px;
            margin: 20px 0;
        }
        .message-field {
            margin-bottom: 15px;
        }
        .field-label {
            font-weight: bold;
            color: #e63812;
        }
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #f8f8f8;
            color: #666666;
            font-size: 14px;
        }
        @media only screen and (max-width: 600px) {
            .email-content {
                width: 100% !important;
            }
            .email-body {
                padding: 20px !important;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-content">
            <div class="email-header">
                <img src="{{ asset('storage/LOGO-SMAB-CROP-1.png') }}" alt="SMAB Logo">
            </div>
            
            <div class="email-body">
                <h2 style="color: #e63812; margin-top: 0;">New Contact Form Submission</h2>
                
                <div class="message-info">                    <div class="message-field">
                        <span class="field-label">Name:</span>
                        <span>{{ $formData['name'] }}</span>
                    </div>
                    
                    <div class="message-field">
                        <span class="field-label">Email:</span>
                        <span>{{ $formData['email'] }}</span>
                    </div>
                    
                    <div class="message-field">
                        <span class="field-label">Phone:</span>
                        <span>{{ $formData['phone'] }}</span>
                    </div>
                    
                    <div class="message-field">
                        <span class="field-label">Subject:</span>
                        <span>{{ $formData['subject'] }}</span>
                    </div>
                    
                    <div class="message-field">
                        <span class="field-label">Message:</span>
                        <p style="margin-top: 5px;">{{ $formData['message'] }}</p>
                    </div>
                </div>
                
                <p style="color: #666666; font-size: 14px;">This message was sent from the SMAB website contact form.</p>
            </div>
            
            <div class="footer">
                <p>&copy; {{ date('Y') }} SMAB. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>
