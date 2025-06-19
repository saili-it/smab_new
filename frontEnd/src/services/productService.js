import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TOKEN = import.meta.env.VITE_API_TOKEN;

// Create axios instance with default config
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getProduitsCategory = async (category) => {
  try {
    const response = await api.get(`/category/${category}/product`, {
      params: {
        mark: 'smab',
        name: category // Adding the category name as a parameter
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProduitDetails = async (productId) => {
  console.log(productId)
  try {
    const response = await api.get(`/product/${productId}/soucategory?mark=smab`);
    if (!response.data) {
      throw new Error('Product not found');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw new Error('Failed to fetch product details. Please try again later.');
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await api.get(`/product`, {
      params: {
        search: query
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};
