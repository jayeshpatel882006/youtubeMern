import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Mycontext } from "../../App";
import { formatDistanceToNow } from "date-fns";

const Activity = () => {
  const [showModal, setShowModal] = useState(false);
  const [pusblishunpublish, setPublisunpublish] = useState(false);
  const [userVideo, setUserVideo] = useState();
  const context = useContext(Mycontext);
  const [currVid, setCurrVid] = useState(null);
  const [currthumb, setcurrThumb] = useState(null);

  const [details, setDetails] = useState({
    title: "",
    description: "",
    isPublished: false,
    thumbnail: null,
    video: null,
  });
  const [updateModal, setUpdateModal] = useState(false);

  useEffect(() => {
    getUserChannelVideo();
  }, []);

  const handalClosemodal = () => {
    if (confirm("Are you want to close upload video  process ? ")) {
      // console.log("close");
      setShowModal(false);
    }
  };

  const handalUploadVideo = async (e) => {
    e.preventDefault();
    // console.log(details);
    const formData = new FormData();
    formData.append("thumbnail", details.thumbnail);
    formData.append("title", details.title);
    formData.append("description", details.description);
    formData.append("isPublished", details.isPublished);
    formData.append("videoFile", details.video);

    // console.log(formData);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SITE}api/v1/video/upload`,
        // email: field.email,
        // password: field.password,
        // fullName: field.fullname,
        // username: field.username,
        formData,
        {
          headers: {
            Authorization: context.userToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //   if (res) {

      //   }

      console.log(res.data);
      if (res.data.success == true) {
        setDetails({
          title: "",
          description: "",
          isPublished: false,
          thumbnail: null,
          video: null,
        });
        setShowModal(false);
      }

      //   console.log(res.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err);
      }
    }
  };

  const handalPublishUnpublic = async (e, changedStatus, videoId) => {
    e.preventDefault();
    setPublisunpublish(changedStatus);
    if (context.user !== undefined) {
      try {
        let res = await axios.post(
          `${process.env.REACT_APP_SITE}api/v1/video/toggalPublish/${videoId}`,
          {},
          {
            headers: {
              Authorization: context.userToken,
            },
          }
        );

        // console.log(res.data);
        getUserChannelVideo();
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      }
    }
  };

  const getUserChannelVideo = async () => {
    try {
      if (context.user !== undefined) {
        try {
          let res = await axios.get(
            `${process.env.REACT_APP_SITE}api/v1/video/channelowner`,
            {
              headers: {
                Authorization: context.userToken,
              },
            }
          );

          // console.log(res.data.data);
          // context.setSubVideo(res.data.data);
          setUserVideo(res.data.data);
        } catch (error) {
          if (error.response) {
            console.log(error.response.data);
          } else {
            console.log(error);
          }
        }
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  };

  const handalUpdateThumbnail = async (e) => {
    e.preventDefault();
    if (!details.thumbnail) return;
    const formData = new FormData();
    formData.append("thubnail", details.thumbnail);
    console.log(currVid);
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_SITE}api/v1/video/updateThumbnail/${currVid}`,
        // email: field.email,
        // password: field.password,
        // fullName: field.fullname,
        // username: field.username,
        formData,
        {
          headers: {
            Authorization: context.userToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
      if (res.data.success == true) {
        // context.setIsLogedin(true);
        // navigate("/");
        setCurrVid(null);

        // console.log(res.data.data);
        // if (prev._id === res.data.data._id) {
        // }
        setDetails({ ...details, thumbnail: null });
        getUserChannelVideo();
        setUpdateModal(false);
      }

      //   console.log(res.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err);
      }
    }
  };

  const handalDeleteVideo = async (e, videoId) => {
    e.preventDefault();
    // console.log(videoId);

    if (!confirm("Are You Want to delete This video")) {
      return console.log("ok we are not deleet it");
    }
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SITE}api/v1/video/deleteVideo/${videoId}`,
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );

      console.log(res.data);
      if (res.data.success == true) {
        // context.setIsLogedin(true);
        // navigate("/");

        // console.log(res.data.data);
        // if (prev._id === res.data.data._id) {
        // }
        getUserChannelVideo();
      }

      //   console.log(res.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err);
      }
    }
  };
  return (
    <div className="container p-3 rounded mx-auto h-full bg-gray-800">
      <div className="my-3">
        <h3 className="text-4xl font-bold">Add video</h3>
        <div className="w-full mt-3">
          <Button
            onClick={() => setShowModal(true)}
            variant="outlined"
            color="inherit"
            className="w-full"
          >
            {" "}
            +{" "}
          </Button>
        </div>
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
            onClick={() => handalClosemodal()}
          />
          <div className="relative mx-auto p-4 w-5/6  max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Upload Video
                </h3>
                <button
                  onClick={() => handalClosemodal()}
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
                  onSubmit={(e) => handalUploadVideo(e)}
                >
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-0 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <p className="my-1 text-sm text-gray-500 dark:text-gray-300">
                      please choose title and description waisly after that it
                      can't be chnaged
                    </p>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          title: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="enter title for video "
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
                      placeholder="enter description for video"
                      required
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <span className="me-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Publish Video
                      </span>
                      <input
                        type="checkbox"
                        value={details.isPublished}
                        className="sr-only peer"
                        onChange={(e) =>
                          setDetails({
                            ...details,
                            isPublished: !details.isPublished,
                          })
                        }
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-100 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="file_input"
                    >
                      Thumbnail
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      aria-describedby="file_input_help"
                      id="file_input"
                      type="file"
                      onChange={(e) =>
                        setDetails({ ...details, thumbnail: e.target.files[0] })
                      }
                    />
                    <p
                      className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                      id="file_input_help"
                    >
                      SVG, PNG, JPG or GIF (MAX. 800x400px).
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          video (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          e.target.className = "block";
                          // console.log(e.target.files[0], e.target.className);
                          setDetails({ ...details, video: e.target.files[0] });
                        }}
                      ></input>
                    </label>
                  </div>
                  {/* <div>
                    <form
                      dropzone
                      action="/file-upload"
                      class="dropzone focus:shadow-soft-primary-outline dark:bg-gray-950 dark:placeholder:text-white/80 dark:text-white/80 text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-border px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none"
                      id="dropzone"
                    >
                      <div class="fallback">
                        <input name="file" type="file" multiple />
                      </div>
                    </form>
                  </div> */}
                  {/* /// */}
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
      </div>
      <div className="my-10">
        <div className="flex justify-between">
          <h3 className="text-4xl font-bold">Your video</h3>
          <Button onClick={() => getUserChannelVideo()} color="inherit">
            <RefreshIcon />
          </Button>
        </div>
        <div className="my-2 flex flex-col gap-5">
          {userVideo?.map((ite, index) => (
            <div
              key={index}
              className="w-full rounded-md flex justify-between p-2 gap-8 bg-gray-900 h-[200px]"
            >
              <div className="w-1/3 flex justify-center ">
                <img
                  src={ite.thubnail}
                  // onMouseEnter={()=>}
                  className="w-4/5 h-full aspect-video object-cover"
                />{" "}
              </div>
              <div className="w-1/3">
                <h3 className="text-2xl">{ite.title}</h3>
                <h3 className="text-xl">{ite.description}</h3>
                <h3 className="text-lg">{ite.views} views</h3>
                <h3 className="text-lg">
                  Created :{" "}
                  {formatDistanceToNow(new Date(ite.createdAt), {
                    addSuffix: true,
                  })}
                </h3>
                {ite.updatedAt && (
                  <h3 className="text-lg">
                    Updated :{" "}
                    {formatDistanceToNow(new Date(ite.updatedAt), {
                      addSuffix: true,
                    })}
                  </h3>
                )}
                <Button
                  color="info"
                  onClick={() => {
                    setCurrVid(ite._id),
                      setUpdateModal(true),
                      setcurrThumb(ite.thubnail);
                  }}
                  variant="outlined"
                >
                  Update Thumbnail
                </Button>
                {/* Update Thumbnail MOdal */}
                <div
                  className={`${
                    updateModal == true ? "block" : "hidden"
                  } flex  fixed  top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full`}
                >
                  {/* <!--backDrop--!> */}
                  <div
                    id="authentication-modal"
                    tabIndex="-1"
                    className="bg-gray-800 opacity-[0.9] fixed w-full md:inset-0 h-full  "
                    aria-hidden="true"
                    onClick={() => {
                      setCurrVid(ite._id), setUpdateModal(false);
                    }}
                  />
                  <div className="relative mx-auto p-4 w-2/5  max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white w-full rounded-lg shadow dark:bg-gray-700">
                      {/* <!-- Modal header --> */}
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Chnage Thumbnail
                        </h3>
                        <button
                          onClick={() => {
                            setCurrVid(ite._id), setUpdateModal(false);
                          }}
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
                          onSubmit={(e) => {
                            handalUpdateThumbnail(e);
                          }}
                        >
                          <div>
                            <img
                              className="aspect-video w-full"
                              src={currthumb}
                            />
                            <label
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              htmlFor="file_input"
                            >
                              Current thumbnail
                            </label>
                            <input
                              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                              aria-describedby="file_input_help"
                              id="file_input"
                              type="file"
                              onChange={(e) =>
                                setDetails({
                                  ...details,
                                  thumbnail: e.target.files[0],
                                })
                              }
                            />
                            {/* <p
                              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                              id="file_input_help"
                            >
                              SVG, PNG, JPG or GIF (MAX. 800x400px).
                            </p> */}
                          </div>

                          <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Update Thumbnail
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Update Thumbnail MOdal Till hear */}
              </div>
              <div className="w-1/3 flex  justify-center">
                <div className="flex flex-col justify-between items-center">
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <span className="me-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Publish Video
                      </span>
                      {/* {setPublisunpublish(ite.isPublished)} */}
                      <input
                        type="checkbox"
                        value={ite.isPublished}
                        checked={ite.isPublished}
                        className="sr-only peer"
                        onChange={(e) =>
                          handalPublishUnpublic(e, !ite.isPublished, ite._id)
                        }
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-950 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-100 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <Button
                    onClick={(e) => {
                      handalDeleteVideo(e, ite._id);
                    }}
                    color="error"
                  >
                    Delete Video
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activity;
