<?php

namespace App\Events;

use App\Models\Comment;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CommentReplied implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $reply;
    public $parentId;

    public function __construct(Comment $reply, $parentId)
    {
        $this->reply = $reply;
        $this->parentId = $parentId;
    }

    public function broadcastOn()
    {
        return new Channel('comments.' . $this->reply->product_id);
    }

    public function broadcastAs()
    {
        return 'comment.replied';
    }

    public function broadcastWith()
    {
        return [
            'reply' => $this->reply->load(['user:id,name']),
            'parentId' => $this->parentId
        ];
    }
}
