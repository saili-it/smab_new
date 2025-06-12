<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\NotificationsController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('user-profile', [AuthController::class, 'me']);
    Route::post('update-profile', [AuthController::class, 'updateProfile']);
    Route::post('change-password', [AuthController::class, 'changePassword']);
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);
});

// Public comment routes
Route::get('/products/{productId}/comments', [CommentsController::class, 'index']);

// Protected routes
Route::group([
    'middleware' => ['api', 'auth:api']
], function () {
    // Broadcasting authentication
    Route::post('/broadcasting/auth', function (Request $request) {
        return Broadcast::auth($request);
    });
    
    // Notification routes
    Route::get('/notifications', [NotificationsController::class, 'index']);
    Route::get('/notifications/unread-count', [NotificationsController::class, 'getUnreadCount']);
    Route::post('/notifications/{id}/mark-as-read', [NotificationsController::class, 'markAsRead']);
    Route::post('/notifications/mark-all-as-read', [NotificationsController::class, 'markAllAsRead']);

    // Comment routes
    Route::post('/products/{productId}/comments', [CommentsController::class, 'store']);
    Route::post('/comments/{commentId}/replies', [CommentsController::class, 'reply']);
});

