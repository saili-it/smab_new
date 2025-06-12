<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Comment;
use App\Models\Notification;
use App\Events\CommentCreated;
use App\Events\CommentReplied;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class NotificationTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $user;
    protected $otherUser;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create test users
        $this->user = User::factory()->create();
        $this->otherUser = User::factory()->create();

        // Create auth token
        $this->actingAs($this->user, 'api');
    }

    /** @test */
    public function it_creates_notification_when_comment_is_created()
    {
        $comment = Comment::factory()->create([
            'user_id' => $this->user->id,
            'product_id' => 1,
            'content' => 'Test comment'
        ]);

        event(new CommentCreated($comment));

        $this->assertDatabaseHas('notifications', [
            'user_id' => $this->otherUser->id,
            'type' => 'comment',
            'comment_id' => $comment->id,
            'read' => false
        ]);
    }

    /** @test */
    public function it_creates_notification_when_reply_is_added()
    {
        $parentComment = Comment::factory()->create([
            'user_id' => $this->otherUser->id,
            'product_id' => 1,
            'content' => 'Parent comment'
        ]);

        $reply = Comment::factory()->create([
            'user_id' => $this->user->id,
            'product_id' => 1,
            'parent_id' => $parentComment->id,
            'content' => 'Reply comment'
        ]);

        event(new CommentReplied($reply, $parentComment->id));

        $this->assertDatabaseHas('notifications', [
            'user_id' => $this->otherUser->id,
            'type' => 'reply',
            'comment_id' => $reply->id,
            'read' => false
        ]);
    }

    /** @test */
    public function user_can_get_their_notifications()
    {
        $notifications = Notification::factory(3)->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->getJson('/api/notifications');

        $response->assertStatus(200)
                ->assertJsonCount(3, 'data');
    }

    /** @test */
    public function user_can_mark_notification_as_read()
    {
        $notification = Notification::factory()->create([
            'user_id' => $this->user->id,
            'read' => false
        ]);

        $response = $this->postJson("/api/notifications/{$notification->id}/mark-as-read");

        $response->assertStatus(200);
        
        $this->assertDatabaseHas('notifications', [
            'id' => $notification->id,
            'read' => true
        ]);
    }

    /** @test */
    public function user_can_mark_all_notifications_as_read()
    {
        Notification::factory(3)->create([
            'user_id' => $this->user->id,
            'read' => false
        ]);

        $response = $this->postJson('/api/notifications/mark-all-as-read');

        $response->assertStatus(200);
        
        $this->assertDatabaseMissing('notifications', [
            'user_id' => $this->user->id,
            'read' => false
        ]);
    }

    /** @test */
    public function user_can_get_unread_notification_count()
    {
        Notification::factory(2)->create([
            'user_id' => $this->user->id,
            'read' => false
        ]);

        Notification::factory()->create([
            'user_id' => $this->user->id,
            'read' => true
        ]);

        $response = $this->getJson('/api/notifications/unread-count');

        $response->assertStatus(200)
                ->assertJson(['count' => 2]);
    }
}
