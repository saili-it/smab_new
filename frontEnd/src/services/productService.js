import axios from 'axios';

const BASE_URL = 'https://smabapi.qalqul.io';
const TOKEN = "F(7icy3t(cuF'6+QOFL#=)LOCK=Ht/j#;P@(:YjbkOmDU8#l-4E=hQr*aq*8aerV";

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `${TOKEN}`,
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
