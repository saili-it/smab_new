<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Events\CommentCreated;
use App\Events\CommentReplied;
use App\Events\CommentDeleted;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index($productId)
    {
        $comments = Comment::with(['user:id,name', 'replies.user:id,name'])
            ->where('product_id', $productId)
            ->whereNull('parent_id')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($comments);
    }    
    
    public function store(Request $request, $productId)
    {
        try {
            if (!auth()->check()) {
                return response()->json(['message' => 'Unauthenticated'], 401);
            }

            $validated = $request->validate([
                'content' => 'required|string|max:1000',
            ]);

            $comment = Comment::create([
                'product_id' => $productId,
                'user_id' => auth()->id(),
                'content' => $validated['content']
            ]);

            $comment->load(['user:id,name']);

            // Optional: Broadcast the event
            try {
                broadcast(new CommentCreated($comment))->toOthers();
            } catch (\Exception $e) {
                // Log broadcasting error but don't fail the request
                \Log::error('Broadcasting error: ' . $e->getMessage());
            }

            return response()->json($comment, 201);
        } catch (\Exception $e) {
            \Log::error('Comment creation error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating comment',
                'error' => $e->getMessage()
            ], 500);
        }
    }   
    public function reply(Request $request, $commentId)
    {
        try {
            $validated = $request->validate([
                'content' => 'required|string|max:1000',
            ]);
            $parentComment = Comment::find($commentId);
            if (!$parentComment) {
                return response()->json([
                    'message' => 'Parent comment not found'
                ], 404);
            }

            $reply = Comment::create([
            'product_id' => $parentComment->product_id,
            'user_id' => auth()->id(),
            'content' => $validated['content'],
            'parent_id' => $commentId
        ]);            $reply->load('user:id,name');

            // Broadcast to WebSocket
            try {
                broadcast(new CommentReplied($reply, $commentId))->toOthers();
            } catch (\Exception $e) {
                // Log broadcasting error but don't fail the request
                \Log::error('Broadcasting error: ' . $e->getMessage());
            }

            return response()->json($reply, 201);
        } catch (\Exception $e) {
            \Log::error('Reply creation error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating reply',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($commentId)
    {
        $comment = Comment::where('id', $commentId)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $comment->delete();

        // Broadcast to WebSocket
        broadcast(new CommentDeleted($commentId))->toOthers();

        return response()->json(['message' => 'Comment deleted']);
    }
}