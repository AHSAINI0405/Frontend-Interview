import { useQuery } from "@tanstack/react-query";
import { fetchBlogById } from "../services/blogApi";
import shareIcn from "../assets/share.png";

export default function BlogDetails({ blogId }: { blogId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => fetchBlogById(blogId),
  });

  if (isLoading) return <p>Loading blog...</p>;
  if (error || !data) return <p>Error loading blog</p>;
const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});
  return (
    <article className="bg-white rounded-lg shadow overflow-hidden">
      <img
        src={data.coverImage}
        className="w-full h-72 object-cover" alt="image"
      />

      <div className="p-6">
        <p className="text-indigo-600 text-sm font-semibold">
          {data.category.join(" • ")}
        </p>

        <h1 className="text-5xl font-bold mt-2">{data.title}</h1>
        <button className="bg-indigo-600 text-white py-1 px-3 mt-5 rounded font-medium flex items-center gap-2 cursor-pointer hover:bg-indigo-800"><img src={shareIcn} alt="share" className="w-4 h-4 filter brightness-0 invert"></img>Share Article</button>
      <div className="bg-gray-200 w-100wh grid grid-cols-3 p-6 mt-5"><span>CATEGORY
         <p>{data.category.join(" & ")}</p>
         </span><span>READ TIME
          <p>5 Mins</p></span><span>DATE
            <p className="text-sm text-gray-500">
  {formattedDate}
</p>
          </span>
          
          </div>
        <p className="mt-6 text-gray-700"> {data.content.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
      
    </span>
  ))}</p>
      </div>
    </article>
  );
}
