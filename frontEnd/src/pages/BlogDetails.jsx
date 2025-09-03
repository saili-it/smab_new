import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogBySlug } from '../services/blogApi';
import { Render } from "@measured/puck";
import { components } from '../components/BlogComponents/components.jsx';

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await getBlogBySlug(slug);
        setBlog(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-custom-vertical from-gray-50 to-white pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-custom-vertical from-gray-50 to-white pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-custom-vertical from-gray-50 to-white pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog Not Found</h2>
          <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
<main className="min-h-screen bg-gradient-custom-vertical from-gray-50 to-white pt-20">
  <article className="w-full px-4 sm:px-6 lg:px-8 py-16">
    <div className="mx-auto max-w-full lg:max-w-7xl">


          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <Render 
              data={{
                content: blog.content,
                root: blog.root || {}
              }} 
              config={{
                components
              }}
            />
          </div>
        </div>
      </article>
    </main>
  );
};

export default BlogDetails;
