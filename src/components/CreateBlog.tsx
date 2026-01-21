import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "@/services/blogApi";
import type { Blog } from "@/types/blog";

export default function CreateBlog({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    content: "",
    coverImage: "",
  });

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      onClose();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBlog: Blog = {
      title: formData.title,
      category: [formData.category],
      description: formData.description,
      content: formData.content,
      coverImage: formData.coverImage,
      date: new Date().toISOString(),
    };

    mutation.mutate(newBlog);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg">
      <h2 className="font-semibold text-lg">Create New Blog</h2>

      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="category"
        placeholder="Category (e.g. FINANCE)"
        value={formData.category}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="coverImage"
        placeholder="Cover Image URL"
        value={formData.coverImage}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <textarea
        name="description"
        placeholder="Short Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="content"
        placeholder="Full Content"
        value={formData.content}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        rows={4}
        required
      />

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-indigo-700"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Creating..." : "Create Blog"}
      </button>

      {mutation.isError && (
        <p className="text-red-500 text-sm">Error creating blog</p>
      )}
    </form>
  );
}
