import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("token");
  const loggedInUserId = token
    ? JSON.parse(atob(token.split(".")[1]))._id
    : null;

  const handleLogout = async () => {
    try {
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/logout`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log("Logout error");
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleFollow = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/follow/${user._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsFollowing(res.data.isFollowing);

      setUser((prev) => ({
        ...prev,
        followers: res.data.isFollowing
          ? [...prev.followers, loggedInUserId]
          : prev.followers.filter((id) => id !== loggedInUserId),
      }));
    } catch (err) {
      console.log("Follow error");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const url = id
          ? `${import.meta.env.VITE_BASE_URL}/users/${id}`
          : `${import.meta.env.VITE_BASE_URL}/users/profile`;

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
        setPosts(res.data.posts || []);

        if (id) {
          setIsFollowing(
            res.data.user.followers?.includes(loggedInUserId)
          );
        }
      } catch (err) {
        console.error("PROFILE ERROR:", err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, [id]);

  if (!user) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-20">

      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <span className="text-2xl font-semibold">Profile</span>

        {!id && (
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 font-medium"
          >
            Logout
          </button>
        )}
      </div>

      <div className="bg-white p-6 flex items-center gap-6">
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

          {user._id === loggedInUserId ? (
            <button className="mt-3 px-4 py-1 border rounded text-sm font-medium">
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className={`mt-3 px-4 py-1 rounded text-sm font-medium ${
                isFollowing
                  ? "border text-black"
                  : "bg-blue-500 text-white"
              }`}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>

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

      <div className="bg-white border-t fixed bottom-0 w-full flex justify-around items-center py-3">
        <button onClick={() => navigate("/home")} className="text-2xl">
          <i className="fa-solid fa-house"></i>
        </button>

        <button
          onClick={() => navigate("/create-post")}
          className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl -mt-8 shadow-lg"
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

export default Profile;
