<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    protected $model = Comment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'product_id' => $this->faker->numberBetween(1, 10),
            'content' => $this->faker->paragraph(),
            'parent_id' => null
        ];
    }

    /**
     * Indicate that the comment is a reply.
     */
    public function reply()
    {
        return $this->state(function (array $attributes) {
            return [
                'parent_id' => Comment::factory()
            ];
        });
    }
}
