import type { Blog } from "../types/blog";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className=" rounded-lg p-4 hover:shadow cursor-pointer bg-white">
      <span className="text-xs text-indigo-600 font-semibold">
        {blog.category[0]}
      </span>

      <h3 className="font-bold mt-2">{blog.title}</h3>

      <p className="text-sm text-gray-500 mt-1">
        {blog.description}
      </p>
    </div>
  );
}
