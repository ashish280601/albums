import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Edit = ({ getData, getSingleData, onEditShow }) => {
  const [editAlbum, setEditAlbum] = useState({ title: "", userId: 11 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditAlbum((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setEditAlbum(getSingleData);
  }, [getSingleData]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${editAlbum.id}`,
        editAlbum
      );
      console.log("res", res.data);
      setEditAlbum({ title: "" });
      getData();
      console.log("editAlbum", editAlbum);
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
  console.log("editAlbum", editAlbum);
  return (
    <div className="albumForm_albumForm__aow90">
      <div className="add-heading">
        <h4>Edit an album</h4>
      </div>
      <form onSubmit={handleEdit} className="add-form-container">
        <input
          placeholder="Album Name"
          name="title"
          value={editAlbum?.title || ""}
          type="text"
          onChange={handleChange}
        />
        <button className="createbtn" type="submit">
          Update
        </button>
        <button
          className="redcolor"
          type="button"
          onClick={() => onEditShow(false)}
        >
          Close
        </button>
      </form>
    </div>
  );
};

export default Edit;
