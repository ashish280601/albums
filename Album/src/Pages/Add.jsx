import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Add = ({ getData }) => {
  const [addAlbum, setAddAlbum] = useState({ title: "", userId: 11 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddAlbum((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        addAlbum
      );
      console.log("res", res.data);
      setAddAlbum({ title: "" });
      getData();
      console.log("addAlbum", addAlbum);
      toast.success("Album Added Successfully", {
        position: "top-center",
        autloClose: 3000,
      });
    } catch (error) {
      console.log("error", error);
      toast.error("Error While Adding Album", {
        position: "top-center",
        autloClose: 3000,
      });
    }
  };

  return (
    <div className="albumForm_albumForm__aow90">
      <div className="add-heading">
        <h4>Create an album</h4>
      </div>
      <form onSubmit={handleAddData} className="add-form-container">
        <input
          placeholder="Album Name"
          name="title"
          value={addAlbum?.title || ""}
          type="text"
          onChange={handleChange}
        />
        <button className="createbtn" type="submit">
          Create
        </button>
        <button
          className="redcolor"
          type="button"
          onClick={() => setAddAlbum({ title: "" })}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default Add;
