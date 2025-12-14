import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/feed`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPosts(res.data.posts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFeed();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <div className="bg-white border-b py-3 text-center text-xl font-semibold">
        Instagram
      </div>

      <div className="flex-1 overflow-y-auto max-w-md mx-auto w-full px-2 py-4 space-y-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white border rounded-lg overflow-hidden"
          >
            <div className="p-3 font-semibold">
              {post.user.username}
            </div>

            <img
              src={post.image}
              alt="post"
              className="w-full h-64 object-cover"
            />

            <div className="p-3">
              <p className="font-semibold">
                {post.likes.length} likes
              </p>
              <p>
                <span className="font-semibold">
                  {post.user.username}
                </span>{" "}
                {post.caption}
              </p>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <p className="text-center text-gray-500">
            No posts yet
          </p>
        )}
      </div>

      <div className="bg-white border-t fixed bottom-0 w-full flex justify-around items-center py-3">

        <button
          onClick={() => navigate("/home")}
          className="text-2xl"
        >
          <i className="fa-solid fa-house"></i>
        </button>

        <button
          onClick={() => navigate("/create-post")}
          className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl -mt-8 shadow-lg"
        >
          <i className="fa-solid fa-plus"></i>
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="text-2xl"
        >
          <i className="fa-regular fa-user"></i>
        </button>

      </div>

    </div>
  );
};

export default Home;
