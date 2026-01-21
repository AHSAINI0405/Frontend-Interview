import { useState,useEffect } from "react";
import Navbar from "./components/Navbar";
import PageHeader from "./components/PageHeader";
import BlogList from "./components/BlogList";
import BlogDetails from "./components/BlogDetails";
import Footer from "./components/Footer";
import CreateBlog from "./components/CreateBlog";

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>("1");
  const [openCreate, setOpenCreate] = useState(false);
  useEffect(() => {
    if (openCreate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
     return () => {
      document.body.style.overflow = "auto";
    };
  }, [openCreate]);
  return (
    <>
      <Navbar onCreateClick={() => setOpenCreate(true)} />
      <PageHeader />

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 bg-gray-200 p-8 ">
        <div className="lg:col-span-1">
          <BlogList onSelect={setSelectedBlogId} />
        </div>

        <div className="lg:col-span-2 ">
          {selectedBlogId && <BlogDetails blogId={selectedBlogId} />}
        </div>
      </main>

{openCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 relative">
            <button
              onClick={() => setOpenCreate(false)}
              className="absolute top-2 right-2 text-gray-500 font-bold  hover:cursor-pointer hover:text-lg"
            >
              ✕
            </button>
            <CreateBlog onClose={() => setOpenCreate(false)} />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default App;
