<?php

namespace App\Listeners;

use App\Events\CommentReplied;
use App\Events\NotificationCreated;
use App\Models\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;

class CreateReplyNotification implements ShouldQueue
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
    public function handle(CommentReplied $event): void
    {
        $reply = $event->reply;
        $parentComment = $reply->parent;

        // Notify the parent comment author
        if ($parentComment && $parentComment->user_id != $reply->user_id) {
            $notification = Notification::create([
                'user_id' => $parentComment->user_id,
                'type' => 'reply',
                'comment_id' => $reply->id,
                'product_id' => $reply->product_id,
                'read' => false,
                'message' => "{$reply->user->name} replied to your comment"
            ]);

            // Broadcast the notification
            event(new NotificationCreated($notification));
        }
    }
}
