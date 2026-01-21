import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../services/blogApi";
import BlogCard from "./BlogCard";
import type { Blog } from "../types/blog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
interface Props {
  onSelect: (id: string) => void;
}

export default function BlogList({ onSelect }: Props) {
  const [selectedId,setSelectedId]=useState<string | null>(null)
  const handleSelect=(id:string)=>{
    onSelect(id);
    setSelectedId(id);
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  if (isLoading) return <p>Loading blogs...</p>;
  if (error) return <p>Error loading blogs</p>;

  return (
    <div>
      <h2 className="font-semibold mb-4 text-lg">Latest Articles</h2>

      <div className="space-y-4">
        {data?.map((blog: Blog) => {
          const isSelected=selectedId===blog.id;
          return(
          <div dir="ltr" key={blog.id} onClick={() => handleSelect(blog.id!)} 
          className={`cursor-pointer rounded-lg transition-all ${isSelected ? "border-s-5 border-blue-500 "
                  : "border-gray-200 hover:bg-gray-50"}`}>
            <BlogCard blog={blog} />
          </div>);}
        )}
      </div>
    </div>
  );
}
