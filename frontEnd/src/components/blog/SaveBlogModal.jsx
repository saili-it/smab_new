/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import websiteContentService from '../../service/websiteContentService.js';
import blogService from '../../service/blogService.js';

const SaveBlogModal = ({ isOpen, onClose, onSave, blogData }) => {
  const [formData, setFormData] = useState({
    siteName: '',
    blogName: '',
    slug: '',
    mainImage: '',
    description: ''
  });
  const [sites, setSites] = useState([]);
  const [loadingSites, setLoadingSites] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    if (field === 'blogName') {
      // Auto-generate slug from blog name
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setFormData(prev => ({
        ...prev,
        blogName: value,
        slug
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Fetch sites list when modal opens
  useEffect(() => {
    if (isOpen && sites.length === 0) {
      fetchSites();
    }
    setError(''); // Clear any previous errors when modal opens
  }, [isOpen]);

  const fetchSites = async () => {
    try {
      setLoadingSites(true);
      const sitesList = await websiteContentService.getSitesList();
      setSites(sitesList || []);
    } catch (error) {
      console.error('Error fetching sites list:', error);
      setError('Error loading sites list. Please try again.');
    } finally {
      setLoadingSites(false);
    }
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.siteName || !formData.blogName || !formData.slug || !formData.mainImage) {
      setError('Please fill in all required fields (Site Name, Blog Name, Slug, and Main Image)');
      return;
    }

    try {
      setSaving(true);
      setError('');

      // Prepare the blog data according to the backend schema
      const blogPayload = {
        siteName: formData.siteName,
        blogName: formData.blogName,
        slug: formData.slug,
        mainImage: formData.mainImage,
        description: formData.description,
        root: {
          title: formData.blogName,
          props: {}
        },
        content: blogData.content,
        zones: blogData.zones || {},
        metadata: {
          blogName: formData.blogName,
          mainImage: formData.mainImage,
          siteName: formData.siteName,
          slug: formData.slug,
          description: formData.description
        }
      };

      // Create the blog
      const createdBlog = await blogService.createBlog(blogPayload);
      
      // Reset form
      setFormData({
        siteName: '',
        blogName: '',
        slug: '',
        mainImage: '',
        description: ''
      });
      
      onSave(createdBlog);
      onClose();
    } catch (error) {
      console.error('Error saving blog:', error);
      setError(error.message || 'Error saving blog. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const generateSlug = () => {
    if (formData.blogName) {
      const slug = formData.blogName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
      handleInputChange('slug', slug);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Save Blog Post</h2>
            <button
              onClick={onClose}
              disabled={saving}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Site Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site Name *
              </label>
              {loadingSites ? (
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
                  Loading sites...
                </div>
              ) : (
                <select
                  value={formData.siteName}
                  onChange={(e) => handleInputChange('siteName', e.target.value)}
                  disabled={saving}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select a site</option>
                  {sites.map((site, index) => (
                    <option key={site.id || index} value={site.name || site.siteName}>
                      {site.name || site.siteName}
                    </option>
                  ))}
                </select>
              )}
              {sites.length === 0 && !loadingSites && (
                <p className="text-xs text-red-500 mt-1">
                  No sites available. Please create a site first.
                </p>
              )}
            </div>

            {/* Blog Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blog Name *
              </label>
              <input
                type="text"
                value={formData.blogName}
                onChange={(e) => handleInputChange('blogName', e.target.value)}
                disabled={saving}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter blog post title"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  disabled={saving}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="url-friendly-slug"
                />
                <button
                  type="button"
                  onClick={generateSlug}
                  className="px-3 py-2 text-sm bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Generate
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                URL-friendly version of your blog name
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                disabled={saving}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter a brief description of your blog post"
              />
            </div>

            {/* Main Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Main Image
              </label>
              <div className="space-y-2">
                {!formData.mainImage ? (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          try {
                            const url = await websiteContentService.uploadMediaFile(file);
                            handleInputChange('mainImage', url);
                          } catch (error) {
                            console.error('Error uploading image:', error);
                            alert('Failed to upload image. Please try again.');
                          }
                        }
                      }}
                      className="hidden"
                      id="main-image-upload"
                    />
                    <label
                      htmlFor="main-image-upload"
                      className={`cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {saving ? 'Uploading...' : 'Choose Image'}
                    </label>
                  </div>
                ) : (
                  <div className="relative inline-block">
                    <img
                      src={formData.mainImage}
                      alt="Main blog image"
                      className="max-w-xs h-32 object-cover rounded-md"
                    />
                    <button
                      onClick={async () => {
                        try {
                          const fileId = formData.mainImage.split('/media/').pop();
                          if (fileId) {
                            await websiteContentService.deleteMediaFile(fileId);
                          }
                          handleInputChange('mainImage', '');
                        } catch (error) {
                          console.error('Error removing image:', error);
                          alert('Failed to remove image. Please try again.');
                        }
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 focus:outline-none"
                    >
                      ×
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Optional: Featured image for your blog post
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              disabled={saving}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Blog'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveBlogModal;
