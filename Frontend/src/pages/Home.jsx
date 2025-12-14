import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const loggedInUserId = token
    ? JSON.parse(atob(token.split(".")[1]))._id
    : null;

  const toggleLike = async (postId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/like/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: res.data.isLiked
                  ? [...post.likes, loggedInUserId]
                  : post.likes.filter((id) => id !== loggedInUserId),
              }
            : post
        )
      );
    } catch {
      console.log("Like error");
    }
  };

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/feed`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPosts(res.data);
      } catch {
        console.log("Feed error");
      }
    };

    fetchFeed();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="bg-white border-b px-4 py-3 flex items-center justify-center gap-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png"
          alt="Instagram"
          className="h-7"
        />
        <span className="text-xl font-semibold">Instagram</span>
      </div>

      <div className="max-w-md mx-auto">
        {posts.map((post) => (
          <div key={post._id} className="bg-white mb-4 border">
            <div className="flex items-center gap-3 p-3">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <i className="fa-solid fa-user text-sm text-gray-600"></i>
              </div>

              <span
                onClick={() => navigate(`/profile/${post.user?._id}`)}
                className="font-semibold text-sm cursor-pointer"
              >
                {post.user?.username}
              </span>
            </div>

            <img
              src={`${import.meta.env.VITE_BASE_URL}/uploads/${post.image}`}
              alt="post"
              className="w-full object-cover"
            />

            <div className="px-3 pt-2 flex gap-4 text-xl">
              <i
                onClick={() => toggleLike(post._id)}
                className={`cursor-pointer ${
                  post.likes?.includes(loggedInUserId)
                    ? "fa-solid fa-heart text-red-500"
                    : "fa-regular fa-heart"
                }`}
              ></i>

              <i className="fa-regular fa-comment cursor-pointer"></i>
            </div>

            {post.caption && (
              <p className="px-3 py-2 text-sm">
                <b>{post.user?.username}</b> {post.caption}
              </p>
            )}
          </div>
        ))}

        {posts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No posts yet
          </p>
        )}
      </div>

      <div className="bg-white border-t fixed bottom-0 w-full flex justify-around py-3">
        <button onClick={() => navigate("/home")} className="text-2xl">
          <i className="fa-solid fa-house"></i>
        </button>

        <button
          onClick={() => navigate("/create-post")}
          className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl -mt-8"
        >
          <i className="fa-solid fa-plus"></i>
        </button>

        <button onClick={() => navigate("/profile")} className="text-2xl">
          <i className="fa-solid fa-user"></i>
        </button>
      </div>
    </div>
  );
};

export default Home;
