<?php

namespace Tests\Unit\Listeners;

use Tests\TestCase;
use App\Models\User;
use App\Models\Comment;
use App\Models\Notification;
use App\Events\CommentCreated;
use App\Events\CommentReplied;
use App\Events\NotificationCreated;
use App\Listeners\CreateCommentNotification;
use App\Listeners\CreateReplyNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;

class CreateNotificationListenerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $otherUser;
    protected $comment;
    protected $reply;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->otherUser = User::factory()->create();

        $this->comment = Comment::factory()->create([
            'user_id' => $this->user->id,
            'product_id' => 1,
            'content' => 'Test comment'
        ]);

        $this->reply = Comment::factory()->create([
            'user_id' => $this->otherUser->id,
            'product_id' => 1,
            'parent_id' => $this->comment->id,
            'content' => 'Test reply'
        ]);
    }

    /** @test */
    public function comment_notification_listener_creates_notification()
    {
        Event::fake([NotificationCreated::class]);

        $listener = new CreateCommentNotification();
        $event = new CommentCreated($this->comment);

        $listener->handle($event);

        $this->assertDatabaseHas('notifications', [
            'user_id' => $this->otherUser->id,
            'type' => 'comment',
            'comment_id' => $this->comment->id,
            'product_id' => $this->comment->product_id,
            'read' => false
        ]);

        Event::assertDispatched(NotificationCreated::class);
    }

    /** @test */
    public function reply_notification_listener_creates_notification()
    {
        Event::fake([NotificationCreated::class]);

        $listener = new CreateReplyNotification();
        $event = new CommentReplied($this->reply, $this->comment->id);

        $listener->handle($event);

        $this->assertDatabaseHas('notifications', [
            'user_id' => $this->user->id, // Original comment author
            'type' => 'reply',
            'comment_id' => $this->reply->id,
            'product_id' => $this->reply->product_id,
            'read' => false
        ]);

        Event::assertDispatched(NotificationCreated::class);
    }

    /** @test */
    public function notification_message_contains_user_name()
    {
        $listener = new CreateCommentNotification();
        $event = new CommentCreated($this->comment);

        $listener->handle($event);

        $notification = Notification::latest()->first();
        $this->assertStringContainsString($this->user->name, $notification->message);
    }

    /** @test */
    public function comment_author_does_not_receive_notification()
    {
        $listener = new CreateCommentNotification();
        $event = new CommentCreated($this->comment);

        $listener->handle($event);

        $this->assertDatabaseMissing('notifications', [
            'user_id' => $this->user->id,
            'comment_id' => $this->comment->id
        ]);
    }

    /** @test */
    public function reply_notification_is_not_created_for_self_replies()
    {
        // Create a reply by the same user who created the original comment
        $selfReply = Comment::factory()->create([
            'user_id' => $this->user->id,
            'product_id' => 1,
            'parent_id' => $this->comment->id,
            'content' => 'Self reply'
        ]);

        $listener = new CreateReplyNotification();
        $event = new CommentReplied($selfReply, $this->comment->id);

        $listener->handle($event);

        // Assert no notification was created
        $this->assertDatabaseMissing('notifications', [
            'comment_id' => $selfReply->id
        ]);
    }
}