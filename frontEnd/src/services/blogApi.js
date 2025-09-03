import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_CONTENT
});

/**
 * Get all blogs for a specific site
 * @param {string} siteName - The name of the site to get blogs from
 * @returns {Promise<Array>} Array of blog posts
 */
export const getAllBlogs = async () => {
  const siteName = import.meta.env.VITE_SITE_NAME;
  if (!siteName) {
    throw new Error('Site name is required. Please set VITE_SITE_NAME in your .env file.');
  }
  try {
    const response = await api.get(`/api/blogs/${siteName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

/**
 * Get a specific blog post by its slug
 * @param {string} slug - The slug of the blog post to retrieve
 * @returns {Promise<Object>} The blog post data
 */
export const getBlogBySlug = async (slug) => {
  const siteName = import.meta.env.VITE_SITE_NAME;
  if (!siteName) {
    throw new Error('Site name is required. Please set VITE_SITE_NAME in your .env file.');
  }
  try {
    const response = await api.get(`/api/blogs/${siteName}/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blog:', error);
    if (error.response && error.response.status === 404) {
      throw new Error('Blog not found');
    }
    throw error;
  }
};
