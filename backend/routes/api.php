<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentsController;

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

// Comments routes
Route::group([
    'middleware' => ['api', 'auth:api']
], function () {
    Route::get('/products/{productId}/comments', [CommentsController::class, 'index']);
    Route::post('/products/{productId}/comments', [CommentsController::class, 'store']);
    Route::post('/comments/{commentId}/replies', [CommentsController::class, 'reply']);
    Route::delete('/comments/{commentId}', [CommentsController::class, 'destroy']);
});

