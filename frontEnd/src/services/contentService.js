import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_CONTENT
});

/**
 * Fetch website content (French version) by siteName from .env
 * @returns {Promise<Object>} The website content data (French)
 */
export const getWebsiteContent = async () => {
  const siteName = import.meta.env.VITE_SITE_NAME;
  if (!siteName) {
    throw new Error('Site name is required. Please set VITE_SITE_NAME in your .env file.');
  }
  try {
    const response = await api.get(`/smab-content-management/${siteName}?lang=en`);
    return response.data;
  } catch (error) {
    console.error('Error fetching website content:', error);
    throw error;
  }
};

