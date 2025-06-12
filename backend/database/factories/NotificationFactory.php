<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Comment;
use App\Models\Notification;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    protected $model = Notification::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = $this->faker->randomElement(['comment', 'reply']);
        
        return [
            'user_id' => User::factory(),
            'type' => $type,
            'comment_id' => Comment::factory(),
            'product_id' => $this->faker->numberBetween(1, 10),
            'read' => $this->faker->boolean(),
            'message' => $this->faker->sentence()
        ];
    }

    /**
     * Indicate that the notification is unread.
     */
    public function unread()
    {
        return $this->state(function (array $attributes) {
            return [
                'read' => false,
            ];
        });
    }

    /**
     * Indicate that the notification is read.
     */
    public function read()
    {
        return $this->state(function (array $attributes) {
            return [
                'read' => true,
            ];
        });
    }
}
