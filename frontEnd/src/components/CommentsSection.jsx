import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReply, FaUserCircle, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import * as commentsService from '../services/commentsService';

const Comment = ({ comment, onReply, isAuthenticated, currentUserId }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    onReply(comment.id, replyContent);
    setReplyContent('');
    setShowReplyForm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-4"
    >
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-start gap-3 mb-2">
          <FaUserCircle className="text-3xl text-gray-400" />
          <div className="flex-1">
            <div>
              <h4 className="font-semibold text-gray-800">{comment.user.name}</h4>
              <p className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleString()}</p>
            </div>
          </div>
        </div>
        <p className="text-gray-700 ml-10">{comment.content}</p>
        <div className="mt-3 ml-10">
          {isAuthenticated ? (
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-sm text-[#e63812] hover:text-[#ff6b4a] flex items-center gap-1"
            >
              <FaReply />
              Répondre
            </button>
          ) : (
            <Link
              to="/login"
              className="text-sm text-[#e63812] hover:text-[#ff6b4a] flex items-center gap-1"
            >
              <FaSignInAlt />
              Se connecter pour répondre
            </Link>
          )}
        </div>

        <AnimatePresence>
          {showReplyForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleReplySubmit}
              className="mt-4 ml-10"
            >
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e63812] resize-none"
                placeholder="Votre réponse..."
                rows={3}
              />
              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReplyForm(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-[#e63812] text-white rounded-lg hover:bg-[#ff6b4a] transition-colors"
                >
                  Répondre
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-10 mt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-gray-600 hover:text-gray-800 mb-2"
            >
              {isExpanded ? 'Masquer' : 'Afficher'} {comment.replies.length} réponse{comment.replies.length > 1 ? 's' : ''}
            </button>
            {isExpanded && (
              <div className="pl-4 border-l-2 border-gray-100 space-y-4">
                {comment.replies.map((reply) => (
                  <Comment
                    key={reply.id}
                    comment={reply}
                    onReply={onReply}
                    isAuthenticated={isAuthenticated}
                    currentUserId={currentUserId}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const CommentsSection = ({ productId }) => {
  const { user, token } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const wsRef = useRef(null);

  // Helper function to recursively update replies
  const updateRepliesRecursively = (replies, parentId, newReply) => {
    if (!replies) return [];
    
    return replies.map(reply => {
      if (reply.id === parentId) {
        return {
          ...reply,
          replies: [...(reply.replies || []), newReply]
        };
      }
      if (reply.replies && reply.replies.length > 0) {
        return {
          ...reply,
          replies: updateRepliesRecursively(reply.replies, parentId, newReply)
        };
      }
      return reply;
    });
  };

  useEffect(() => {    // Initialize WebSocket connection
    const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}/ws/comments/${productId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'comment:created':
          setComments(prevComments => [data.comment, ...prevComments]);
          break;
        case 'comment:replied':
          setComments(prevComments => {
            return prevComments.map(comment => {
              if (comment.id === data.parentId) {
                return {
                  ...comment,
                  replies: [...(comment.replies || []), data.reply]
                };
              }
              if (comment.replies && comment.replies.length > 0) {
                return {
                  ...comment,
                  replies: updateRepliesRecursively(comment.replies, data.parentId, data.reply)
                };
              }
              return comment;
            });
          });
          break;
      }
    };

    // Fetch initial comments
    fetchComments();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [productId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await commentsService.getComments(productId, token);
      setComments(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !token) return;

    try {
      const newCommentData = await commentsService.createComment(productId, newComment, token);
      setComments(prevComments => [newCommentData, ...prevComments]);
      setNewComment('');
      setError(null);
    } catch (error) {
      console.error('Error posting comment:', error);
      setError('Failed to post comment');
    }
  };

  const handleReply = async (commentId, content) => {
    if (!content.trim() || !token) return;

    try {
      const newReply = await commentsService.createReply(commentId, content, productId, token);
      setComments(prevComments => {
        return prevComments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newReply]
            };
          }
          if (comment.replies && comment.replies.length > 0) {
            return {
              ...comment,
              replies: updateRepliesRecursively(comment.replies, commentId, newReply)
            };
          }
          return comment;
        });
      });
      setError(null);
    } catch (error) {
      console.error('Error posting reply:', error);
      setError('Failed to post reply');
    }
  };

  return (
    <div className="my-12">
      <h2 className="text-2xl font-semibold mb-6">Commentaires</h2>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}
      
      {user ? (
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e63812] resize-none"
            placeholder="Partagez votre avis sur ce produit..."
            rows={4}
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#e63812] text-white rounded-xl hover:bg-[#ff6b4a] transition-colors"
            >
              Publier
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 rounded-xl p-6 text-center mb-8">
          <p className="text-gray-600 mb-4">Connectez-vous pour laisser un commentaire</p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#e63812] text-white rounded-xl hover:bg-[#ff6b4a] transition-colors"
          >
            <FaSignInAlt />
            Se connecter
          </Link>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/6" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              isAuthenticated={!!user}
              currentUserId={user?.id}
            />
          ))}
          {comments.length === 0 && (
            <p className="text-center text-gray-500">Aucun commentaire pour le moment</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
