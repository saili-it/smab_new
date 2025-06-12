<?php

namespace App\Events;

use App\Models\Comment;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CommentCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $comment;

    public function __construct(Comment $comment)
    {
        $this->comment = $comment;
    }

    public function broadcastOn()
    {
        return new Channel('comments.' . $this->comment->product_id);
    }

    public function broadcastAs()
    {
        return 'comment.created';
    }

    public function broadcastWith()
    {
        return [
            'comment' => $this->comment->load(['user:id,name', 'replies.user:id,name'])
        ];
    }
}