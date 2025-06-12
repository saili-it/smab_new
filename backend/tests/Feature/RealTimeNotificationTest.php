<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Comment;
use App\Events\CommentCreated;
use App\Events\CommentReplied;
use App\Events\NotificationCreated;
use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class RealTimeNotificationTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $user;
    protected $otherUser;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->user = User::factory()->create();
        $this->otherUser = User::factory()->create();
        
        $this->actingAs($this->user, 'api');
    }

    /** @test */
    public function it_broadcasts_notification_when_comment_is_created()
    {
        Event::fake([NotificationCreated::class]);

        $comment = Comment::factory()->create([
            'user_id' => $this->user->id,
            'product_id' => 1,
            'content' => 'Test comment'
        ]);

        // Trigger comment created event
        event(new CommentCreated($comment));

        Event::assertDispatched(NotificationCreated::class, function ($event) {
            return $event->notification->type === 'comment'
                && $event->notification->user_id === $this->otherUser->id;
        });
    }

    /** @test */
    public function it_broadcasts_notification_when_reply_is_added()
    {
        Event::fake([NotificationCreated::class]);

        $parentComment = Comment::factory()->create([
            'user_id' => $this->otherUser->id,
            'product_id' => 1
        ]);

        $reply = Comment::factory()->create([
            'user_id' => $this->user->id,
            'product_id' => 1,
            'parent_id' => $parentComment->id
        ]);

        // Trigger reply event
        event(new CommentReplied($reply, $parentComment->id));

        Event::assertDispatched(NotificationCreated::class, function ($event) use ($reply) {
            return $event->notification->type === 'reply'
                && $event->notification->comment_id === $reply->id;
        });
    }

    /** @test */
    public function notification_has_correct_broadcast_format()
    {
        Event::fake([NotificationCreated::class]);

        $comment = Comment::factory()->create([
            'user_id' => $this->user->id,
            'product_id' => 1
        ]);

        event(new CommentCreated($comment));

        Event::assertDispatched(NotificationCreated::class, function ($event) {
            $broadcastData = $event->broadcastWith();
            return isset($broadcastData['id'])
                && isset($broadcastData['type'])
                && isset($broadcastData['message'])
                && isset($broadcastData['read'])
                && isset($broadcastData['created_at']);
        });
    }

    /** @test */
    public function notification_uses_private_channel()
    {
        Event::fake([NotificationCreated::class]);

        $comment = Comment::factory()->create([
            'user_id' => $this->user->id,
            'product_id' => 1
        ]);

        event(new CommentCreated($comment));

        Event::assertDispatched(NotificationCreated::class, function ($event) {
            $channels = $event->broadcastOn();
            return $channels[0]->name === "notifications.{$this->otherUser->id}";
        });
    }

    /** @test */
    public function multiple_users_receive_notifications_for_comment()
    {
        Event::fake([NotificationCreated::class]);

        // Create two additional users
        $thirdUser = User::factory()->create();
        $fourthUser = User::factory()->create();

        $comment = Comment::factory()->create([
            'user_id' => $this->user->id,
            'product_id' => 1
        ]);

        event(new CommentCreated($comment));

        // Assert notifications were created for other users but not the comment author
        $this->assertDatabaseMissing('notifications', [
            'user_id' => $this->user->id
        ]);

        $this->assertDatabaseHas('notifications', [
            'user_id' => $this->otherUser->id
        ]);

        $this->assertDatabaseHas('notifications', [
            'user_id' => $thirdUser->id
        ]);

        $this->assertDatabaseHas('notifications', [
            'user_id' => $fourthUser->id
        ]);
    }
}
