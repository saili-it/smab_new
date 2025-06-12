<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $notifications = Notification::where('user_id', auth()->id())
            ->with(['comment.user:id,name'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $notifications
        ]);
    }

    public function markAsRead($id)
    {
        $notification = Notification::where('user_id', auth()->id())
            ->findOrFail($id);
        
        $notification->update(['read' => true]);

        return response()->json(['message' => 'Notification marked as read']);
    }

    public function markAllAsRead()
    {
        Notification::where('user_id', auth()->id())
            ->update(['read' => true]);

        return response()->json(['message' => 'All notifications marked as read']);
    }

    public function getUnreadCount()
    {
        $count = Notification::where('user_id', auth()->id())
            ->where('read', false)
            ->count();

        return response()->json(['count' => $count]);
    }
}
