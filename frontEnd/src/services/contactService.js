import { API_URL } from '../config';

export const submitContactForm = async (formData) => {
  const response = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to send message');
  }
  return data;
};
