const API_URL = import.meta.env.VITE_API_URL;

export const getComments = async (productId, token) => {
  const response = await fetch(`${API_URL}/products/${productId}/comments`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  
  return response.json();
};

export const createComment = async (productId, content, token) => {
  const response = await fetch(`${API_URL}/products/${productId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  });
  
  if (!response.ok) {
    throw new Error('Failed to post comment');
  }

  return response.json();
};

export const createReply = async (commentId, content, productId, token) => {
  const response = await fetch(`${API_URL}/comments/${commentId}/replies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ 
      content,
      productId: parseInt(productId) // Ensure productId is a number
    })
  });
  
  if (!response.ok) {
    throw new Error('Failed to post reply');
  }

  return response.json();
};

export const deleteComment = async (commentId, token) => {
  const response = await fetch(`${API_URL}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete comment');
  }

  return true;
};
