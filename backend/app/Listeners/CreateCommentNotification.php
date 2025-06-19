<?php

namespace App\Listeners;

use App\Events\CommentCreated;
use App\Events\NotificationCreated;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;

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
        // This is just an example - you might want to modify this based on your needs
        $usersToNotify = User::where('id', '!=', $comment->user_id)
            ->get();

        foreach ($usersToNotify as $user) {
            $notification = Notification::create([
                'user_id' => $user->id,
                'type' => 'comment',
                'comment_id' => $comment->id,
                'product_id' => $comment->product_id,
                'read' => false,
                'message' => "{$comment->user->name} commented on a product"
            ]);

            // Broadcast the notification
            event(new NotificationCreated($notification));
        }
    }
}
