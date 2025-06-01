import React from 'react';
import { useParams } from 'react-router-dom';
import BlogId1 from './BlogsContent/BlogId1';
import BlogId2 from './BlogsContent/BlogId2';
import BlogId3 from './BlogsContent/BlogId3';

const BlogDetails = () => {
  const { id } = useParams();

  const getBlogContent = () => {
    switch (id) {
      case '1':
        return <BlogId1 />;
      case '2':
        return <BlogId2 />;
      case '3':
        return <BlogId3 />;
      default:
        return <div>Blog not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <article className="prose prose-lg max-w-4xl mx-auto">
          {getBlogContent()}
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;
