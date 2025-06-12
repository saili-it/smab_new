<?php

namespace App\Listeners;

use App\Events\CommentCreated;
use App\Events\NotificationCreated;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Broadcast;

class CreateCommentNotification implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(CommentCreated $event): void
    {
        $comment = $event->comment;
        
        // Get product creator or other relevant users who should be notified
        $usersToNotify = User::where('id', '!=', $comment->user_id)
            ->get();

        foreach ($usersToNotify as $user) {
            // Check for existing notification to prevent duplicates
            $exists = Notification::where('user_id', $user->id)
                ->where('type', 'comment')
                ->where('comment_id', $comment->id)
                ->exists();

            if (!$exists) {
                $notification = Notification::create([
                    'user_id' => $user->id,
                    'type' => 'comment',
                    'comment_id' => $comment->id,
                    'product_id' => $comment->product_id,
                    'read' => false,
                    'message' => "{$comment->user->name} commented on a product"
                ]);

                // Broadcast the notification
                broadcast(new NotificationCreated($notification))->toOthers();
            }
        }
    }
}
