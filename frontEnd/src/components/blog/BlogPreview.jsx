/* eslint-disable react/prop-types */
import { Render } from "@measured/puck";
import { components } from '../BlogComponents/components.jsx';

const BlogPreview = ({ data }) => {
  const config = {
    components,
    roots: [{
      id: "blog",
      label: "Blog Template"
    }]
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <Render config={config} data={data} />
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;
