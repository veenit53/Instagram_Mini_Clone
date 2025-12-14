import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("TOKEN:", token);

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("PROFILE RESPONSE:", res.data);

      setUser(res.data.user);
      setPosts(res.data.posts);
    } catch (err) {
      console.error("PROFILE ERROR:", err.response?.data || err.message);
    }
  };

  fetchProfile();
}, []);


  if (!user) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-20">

      <div className="bg-white border-b py-3 text-center text-xl font-semibold">
        Profile
      </div>

      <div className="bg-white p-6 flex items-center gap-6 ">
        <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
            <i className="fa-solid fa-user text-4xl text-gray-600"></i>
        </div>


        <div>
          <h2 className="text-lg font-semibold">{user.username}</h2>

          <div className="flex gap-4 text-sm text-gray-600 mt-1">
            <span>
              <b>{posts.length}</b> posts
            </span>
            <span>
              <b>{user.followers?.length || 0}</b> followers
            </span>
            <span>
              <b>{user.following?.length || 0}</b> following
            </span>
          </div>

          <button className="mt-3 px-4 py-1 border rounded text-sm font-medium">
            Edit Profile
          </button>
        </div>
      </div>

      {/* 🖼️ Posts Grid */}
      <div className="grid grid-cols-3 gap-1 mt-1">
        {posts.map((post) => (
          <img
            key={post._id}
            src={`${import.meta.env.VITE_BASE_URL}/uploads/${post.image}`}
            alt="post"
            className="w-full aspect-square object-cover"
        />

        ))}

        {posts.length === 0 && (
          <p className="col-span-3 text-center text-gray-500 mt-10">
            No posts yet
          </p>
        )}
      </div>

      {/* ⬇️ Bottom Navigation */}
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
          <i className="fa-solid fa-user"></i>
        </button>

      </div>
    </div>
  );
};

export default Profile;
