<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Events\NotificationCreated;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'comment_id',
        'product_id',
        'read',
        'message'
    ];

    protected $casts = [
        'read' => 'boolean'
    ];

    protected static function boot()
    {
        parent::boot();

        // Automatically broadcast the notification when created
        static::created(function ($notification) {
            broadcast(new NotificationCreated($notification))->toOthers();
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comment()
    {
        return $this->belongsTo(Comment::class);
    }

    public function scopeUnread($query)
    {
        return $query->where('read', false);
    }

    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function markAsRead()
    {
        $this->update(['read' => true]);
    }

    public static function markAllAsRead($userId)
    {
        static::forUser($userId)->update(['read' => true]);
    }
}
