import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Add from "../Pages/Add";
import Edit from "../Pages/Edit";

const Albums = () => {
  // creating a state to store fetch data
  const [albumData, setAlbumData] = useState(null);
  // create a state for edit and add to toggle the model
  const [addShow, setAddShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  // create a state to store single data
  const [singleData, setSingleData] = useState(null);

  const handleShow = (type) => {
    if (type === "add") {
      setAddShow((prev) => !prev);
      setEditShow(false);
    } else if (type === "edit") {
      setEditShow((prev) => !prev);
      setAddShow(false);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      console.log("res", res.data);
      setAlbumData(res.data);
      console.log("albumData", albumData);
    } catch (error) {
      console.log("error", error);
      toast.error("Error While Fetching Data!!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleDelete = async (data) => {
    try {
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this album"
      );

      if (userConfirmed) {
        console.log("userConfirmed", userConfirmed);
        const res = await axios.delete(
          `https://jsonplaceholder.typicode.com/posts/${data.id}`
        );
        console.log("res", res.data);
        fetchData();
        setSingleData(null);
        toast.success("Album Deleted Successful", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Error While Deleting Album!!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  console.log("singleData", singleData);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <section className="Albums_sec">
        <div className="Albums_container">
          <div className="Albums_rownewrow">
            <div className="boxone">
              <div className="albumsList_top__Lf4N8">
                {editShow ? (
                  <Edit getData={fetchData} getSingleData={singleData} onEditShow={setEditShow}/>
                ) : (
                  ""
                )}
                {addShow ? <Add getData={fetchData} /> : ""}
                <div className="albumsaddbtn">
                  <h1>Your albums</h1>
                  <button
                    className="redcolor"
                    onClick={() => handleShow("add")}
                  >
                    {addShow ? "Close" : "Add album"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="Albums_row">
            <div className="Albums_col">
              {albumData?.map((data) => (
                <div
                  className="album-parent"
                  key={data.id}
                  onClick={() => {
                    if (singleData === data.id) {
                      setSingleData(null);
                    } else {
                      setSingleData(data);
                    }
                  }}
                >
                  <div className="btn_add">
                    {" "}
                    <div>
                      <button
                        className="edit"
                        onClick={() => handleShow("edit")}
                      >
                        <img
                          src="https://mellow-seahorse-fc9268.netlify.app/assets/edit.png"
                          alt="edit-data"
                        />
                      </button>
                    </div>
                    <div>
                      <button onClick={() => handleDelete(data)}>
                        <img
                          src="https://mellow-seahorse-fc9268.netlify.app/assets/trash-bin.png"
                          alt="edit-data"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="album-child">
                    <img
                      src="https://mellow-seahorse-fc9268.netlify.app/assets/photos.png"
                      alt="album-icon"
                      width="50px"
                      height="50px"
                    />
                  </div>
                  <div className="title">
                    <h4>{data.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Albums;
