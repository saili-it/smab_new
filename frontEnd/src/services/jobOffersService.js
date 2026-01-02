const API_URL = import.meta.env.VITE_API_CONTENT;

/**
 * Get all active job offers
 * @returns {Promise<Object>} Response with active job offers
 */
export const getActiveJobOffers = async () => {
  try {
    const response = await fetch(`${API_URL}/posts/active`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch job offers');
    
    return data;
  } catch (error) {
    console.error('Error fetching active job offers:', error);
    throw error;
  }
};

/**
 * Get a specific job offer by ID
 * @param {string} id - The ID of the job offer
 * @returns {Promise<Object>} Response with job offer details
 */
export const getJobOfferById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch job offer');
    
    return data;
  } catch (error) {
    console.error('Error fetching job offer:', error);
    throw error;
  }
};

