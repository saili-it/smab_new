<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'message' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            Mail::to(env('MAIL_FROM_ADDRESS'))
                ->send(new ContactFormMail($request->all()));

            return response()->json([
                'message' => 'Message sent successfully!',
                'status' => 'success'
            ]);
        } catch (\Exception $e) {
            \Log::error('Contact Form Email Error: ' . $e->getMessage());
            
            return response()->json([
                'message' => 'Could not send message',
                'status' => 'error',
                'debug' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
}
