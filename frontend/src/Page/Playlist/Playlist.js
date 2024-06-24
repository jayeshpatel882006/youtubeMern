import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Mycontext } from "../../App";
import PlaylistCard from "../../Components/PlaylistCard/PlaylistCard";
import { Button } from "@mui/material";

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState(false);
  const context = useContext(Mycontext);

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const fetchPlaylist = async () => {
    try {
      let Playlist = await axios.get(
        `${
          process.env.REACT_APP_SITE
        }api/v1/playlist/user/${localStorage.getItem("_id")}`,
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );
      console.log(Playlist.data.data);
      setPlaylist(Playlist.data.data);
    } catch (error) {
      if (error.response) {
        ////geahuihik
        if (error.response) {
          console.log(error.response.data);
        }
        // console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const handalCreatePlaylist = async (e) => {
    e.preventDefault();
    // console.log(details);
    try {
      let Playlist = await axios.post(
        `${process.env.REACT_APP_SITE}api/v1/playlist`,
        { name: details.name, description: details.description },
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );
      console.log(Playlist.data.data);
      // setPlaylist(Playlist.data.data);
      setShowModal(false);
      fetchPlaylist();
    } catch (error) {
      if (error.response) {
        ////geahuihik
        if (error.response) {
          console.log(error.response.data);
        }
        // console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const handalDeletePlaylist = async (playlisId) => {
    if (!confirm("Are You want to delte this playlist ?")) {
      return console.log("not deleted");
    }

    try {
      let Playlist = await axios.delete(
        `${process.env.REACT_APP_SITE}api/v1/playlist/${playlisId}`,
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );
      console.log(Playlist.data.data);
      fetchPlaylist();
    } catch (error) {
      if (error.response) {
        ////geahuihik
        if (error.response) {
          console.log(error.response.data);
        }
        // console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };
  return (
    <div className="container bg-gray-800 p-3 mt-2 mx-auto rounded-md">
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold">My Playlist</h3>
        <Button
          onClick={() => setShowModal(true)}
          variant="outlined"
          color="inherit"
        >
          Add Playlist
        </Button>
        {/* start modal */}

        <div
          className={`${
            showModal == true ? "block" : "hidden"
          } flex  fixed  top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full`}
        >
          {/* <!--backDrop--!> */}
          <div
            id="authentication-modal"
            tabIndex="-1"
            className="bg-gray-800 opacity-[0.9] fixed w-full md:inset-0 h-full  "
            aria-hidden="true"
            onClick={() => setShowModal(false)}
          />
          <div className="relative mx-auto p-4 w-1/2  max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Create New Playlist
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="end-2.5  text-gray-400 bg-transparent hover:bg-gray-900 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  //   data-modal-hide="authentication-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-4 md:p-5">
                <form
                  className="space-y-4"
                  onSubmit={(e) => handalCreatePlaylist(e)}
                >
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-0 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name of playlist
                    </label>

                    <input
                      type="text"
                      name="title"
                      id="title"
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          name: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="enter title for playlist "
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          description: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="enter description for playlist"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Upload Video
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* End modal */}
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-3">
        {playlist?.map((ite, index) => (
          <PlaylistCard
            key={index}
            ite={ite}
            handalDeletePlaylist={handalDeletePlaylist}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
