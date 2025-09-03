const API_URL = import.meta.env.VITE_API_CONTENT;

class WebsiteContentService {
  async uploadMediaFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_URL}/media/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      return `${API_URL}/media/${data.fileId}`;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async deleteMediaFile(fileId) {
    try {
      const response = await fetch(`${API_URL}/media/${fileId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete file');
      }

      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
}

export default new WebsiteContentService();
