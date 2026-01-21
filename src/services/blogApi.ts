import type { Blog } from "@/types/blog";
const API_URL="http://localhost:3001/blogs";

//GET all Blogs
export const fetchBlogs=async():Promise <Blog[]> =>{
    const res=await fetch(API_URL);
    if(!res.ok) throw new Error("Failed to fetch Blog");
    return res.json();

};

//Get Blog by id
export const fetchBlogById= async (id:number):Promise <Blog>=>{
    const res=await fetch(`${API_URL}/${id}`);
    if(!res.ok) throw new Error("Failed to Fetch Blog");
    return res.json();
};

//Create Blog
export const createBlog=async(blog :Blog):Promise <Blog>=>{
    const res=await fetch(API_URL,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(blog)
    });
    if(!res.ok) throw new Error("Failed to create a blog");
    return res.json();
}