import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("SELECTED FILE:", file);
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/profile");
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b py-3 text-center text-xl font-semibold">
        Create Post
      </div>

      <form
        onSubmit={submitHandler}
        className="max-w-md mx-auto mt-6 bg-white p-4 rounded space-y-4"
      >

        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded"
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center border rounded text-gray-400">
            Select an image
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        <textarea
          placeholder="Write a caption..."
          className="w-full border p-2 rounded"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <button
            disabled={!image}
            className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
            >
            Share
        </button>

      </form>
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

export default CreatePost;
