import { Button, IconButton } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Mycontext } from "../../App";
import { formatDistanceToNow } from "date-fns";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import RefreshIcon from "@mui/icons-material/Refresh";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const VideoDisplay = () => {
  let { id } = useParams();
  const videoEl = useRef(null);

  const context = useContext(Mycontext);
  const [video, setVideo] = useState();
  const [subvideo, setSubVideo] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [playlist, setplaylist] = useState([]);
  const [playlistModal, setPlaylistModal] = useState(false);
  const [comments, setComments] = useState();
  const [page, setPage] = useState(2);
  const [userComments, setUserComments] = useState("");
  const [deleteDrop, setDeleteDrop] = useState(false);
  const [channelDetail, setChannelDetail] = useState({
    subscribe: false,
    subscriber: 0,
    avatar: "",
    fullName: "",
    username: "",
    _id: "",
  });

  const i = [
    {
      title:
        "amezing video on entier pateltubamezing video on entier pateltubee aohsfuihruighuighghiafefqfqfqfqfqfgqgfqgqgqg",
      thubnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      owner: "Patel",
      views: 222,
      createdAt: "2024-06-05T09:06:24.408Z",
      userPhoto:
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    {
      _id: "66602a90cbb536a3ddcb99ef",
      videoFile:
        "http://res.cloudinary.com/dygl9cjyd/video/upload/v1717578382/uyjcbuo6ylxn8kweuc1o.mp4",
      thubnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      title: "amezing Video",
      description: "this is amezing video website",
      duration: 8.2,
      views: 7,
      isPublished: true,
      owner: {
        _id: "6668084a29c67df5d8fee3ce",
        username: "aaa",
        email: "kaxaf81276@kernuo.com",
        avatar:
          "http://res.cloudinary.com/dygl9cjyd/image/upload/v1718093899/foit6k5stngdtijbri8t.jpg",
      },
      createdAt: "2024-06-05T09:06:24.408Z",
      updatedAt: "2024-06-18T06:42:41.260Z",
    },
    {
      _id: "66602a90cbb536a3ddcb99ef",
      videoFile:
        "http://res.cloudinary.com/dygl9cjyd/video/upload/v1717578382/uyjcbuo6ylxn8kweuc1o.mp4",
      thubnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      title: "amezing Video",
      description: "this is amezing video website",
      duration: 8.2,
      views: 7,
      isPublished: true,
      owner: {
        _id: "6668084a29c67df5d8fee3ce",
        username: "aaa",
        email: "kaxaf81276@kernuo.com",
        avatar:
          "http://res.cloudinary.com/dygl9cjyd/image/upload/v1718093899/foit6k5stngdtijbri8t.jpg",
      },
      createdAt: "2024-06-05T09:06:24.408Z",
      updatedAt: "2024-06-18T06:42:41.260Z",
    },
  ];

  const fetchsubVideo = async () => {
    // console.log(context.user);
    try {
      let res = await axios.get(`${process.env.REACT_APP_SITE}api/v1/video`, {
        headers: {
          Authorization: context.userToken,
        },
      });

      setSubVideo(res.data.data);
      // console.log(res.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  // const response = {
  //   statusCode: 200,
  //   data: [
  //     {
  //       _id: "66602a90cbb536a3ddcb99ef",
  //       videoFile:
  //         "http://res.cloudinary.com/dygl9cjyd/video/upload/v1717578382/uyjcbuo6ylxn8kweuc1o.mp4",
  //       thubnail:
  //         "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
  //       title: "amezing Video",
  //       description: "this is amezing video website",
  //       duration: 8.2,
  //       views: 110,
  //       isPublished: true,
  //       createdAt: "2024-06-05T09:06:24.408Z",
  //       ChhannalDetail: [
  //         {
  //           _id: "665d3bc7702e1c174341fbff",
  //           username: "jayu",
  //           fullName: "jayuPatel",
  //           avatar:
  //             "http://res.cloudinary.com/dygl9cjyd/image/upload/v1718084531/smmvmyljyips81h1rhpa.png",
  //           subscriberCount: 2,
  //         },
  //       ],
  //     },
  //   ],
  //   message: "Video Fetchd",
  //   success: true,
  // };

  // let i = {
  //   _id: "66602a90cbb536a3ddcb99ef",
  //   videoFile:
  //     "http://res.cloudinary.com/dygl9cjyd/video/upload/v1717578382/uyjcbuo6ylxn8kweuc1o.mp4",
  //   thubnail:
  //     "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
  //   title: "amezing Video",
  //   description: "this is amezing video website",
  //   duration: 8.2,
  //   views: 0,
  //   isPublished: true,
  //   createdAt: "2024-06-05T09:06:24.408Z",
  //   ChhannalDetail: [
  //     {
  //       _id: "665d3bc7702e1c174341fbff",
  //       username: "jayu",
  //       fullName: "jayuPatel",
  //       avatar:
  //         "https://res.cloudinary.com/dygl9cjyd/image/upload/v1718210125/sj6svbmwgdbgxw0p7iv6.png",
  //       subscriberCount: 2,
  //     },
  //   ],
  // };

  const fetchLike = async () => {
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_SITE}api/v1/like/video/getlikes/${id}`,
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );

      // console.log(res.data.data);

      return res.data.data;
      // setVideo({
      //   ...video,
      //   like: res.data.data,
      //   // avatar: res.data.data.avatar,
      //   // fullName: res.data.data.fullName,
      //   // username: res.data.data.username,
      //   // _id: res.data.data._id,
      // });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const handalFetchChannel = async () => {
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_SITE}api/v1/users/channel/${channelDetail.username}`,
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );

      // console.log(res.data.data);

      setChannelDetail({
        ...channelDetail,
        subscriber: res.data.data.subscriberCount,
        subscribe: res.data.data.isSubscribed,
        // avatar: res.data.data.avatar,
        // fullName: res.data.data.fullName,
        // username: res.data.data.username,
        // _id: res.data.data._id,
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchVideo();

    if (subvideo?.length == 0) {
      // console.log("fetch Sub video");
      fetchsubVideo();
    }
  }, []);

  const fetchVideo = async () => {
    // console.log(context.userToken);
    try {
      if (!id) {
        return console.log("Id is required");
      }
      let res = await axios.get(
        `${process.env.REACT_APP_SITE}api/v1/video/getVideo/${id}`,
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );

      // console.log(res.data);
      // console.log(res.data.data[0]);
      let like = await fetchLike();
      // console.log(res.data.data[0]);
      setVideo({ ...res.data.data[0], Like: like });
      fetchLike();
      getPlaylistname();
      fetchComments();
      setChannelDetail({
        ...channelDetail,
        subscriber: res.data.data[0]?.ChhannalDetail.subscriberCount,
        subscribe: res.data.data[0]?.ChhannalDetail.isUserSubscribed,
        avatar: res.data.data[0]?.ChhannalDetail.avatar,
        fullName: res.data.data[0]?.ChhannalDetail.fullName,
        username: res.data.data[0]?.ChhannalDetail.username,
        _id: res.data.data[0]?.ChhannalDetail._id,
      });
      // console.log(res.data.data[0]?.ChhannalDetail.isUserSubscribed);
      // setSubVideo(context.subvideos);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const addViews = async () => {
    console.log("video is loaded");

    // setTimeout(async () => {
    //   console.log("see the video", video._id);
    //   try {
    //     let res = await axios.post(
    //       `${process.env.REACT_APP_SITE}api/v1/video/getVideo/${video._id}`,
    //       {},
    //       {
    //         headers: {
    //           Authorization: context.userToken,
    //         },
    //       }
    //     );
    //     console.log(res.data);
    //   } catch (error) {
    //     if (error.response) {
    //       console.log(error.response.data);
    //     } else {
    //       console.log(error);
    //     }
    //   }
    // }, handleLoadedMetadata() / 5);
  };

  const handleLoadedMetadata = () => {
    const video = videoEl.current;
    if (!video) return;
    // console.log(`The video is ${video.duration / 5} seconds long.`);
    return video.duration;
  };
  //   console.log(response.data[0].videoFile);

  const toggalSubscribeChannel = async (channelId, name) => {
    // if (confirm(`Are You want to UnSunscribe ${name}`) == true) {
    // console.log("You pressed OK!");
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_SITE}api/v1/subscriptions/c/${channelId}`,
        {},
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );
      if (response.data.success == true) {
        // setIsSubscribed(!isSubscribed);
        // console.log(response.data.data);
        handalFetchChannel();
        // setChannelDetail()
        // setsubscribe(!subscribe)
        setChannelDetail({
          ...channelDetail,
          subscribe: !channelDetail.subscribe,
        });
      }
    } catch (error) {
      //   setIsSubscribed(isSubscribed);
      //   setIsSubscribed(isSubscribed);
      setChannelDetail({
        ...channelDetail,
        subscribe: channelDetail.subscribe,
      });
      // setsubscribe(subscribe);

      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
    // }
  };

  const toggalLikeVideo = async () => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_SITE}api/v1/like/toggal/v/${id}`,
        {},
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );
      if (response.data.success == true) {
        let like = await fetchLike();
        console.log("res:", response.data);
        setVideo({ ...video, isUserLiked: response.data.data, Like: like });
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const getPlaylistname = async () => {
    try {
      let playlistname = await axios.get(
        `${process.env.REACT_APP_SITE}api/v1/playlist/user/nameplaylist/${context.userToken}`,
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );
      // console.log(playlistname.data.data);
      setplaylist(playlistname.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  };
  const handalAddVideoToPlaylist = async (e) => {
    e.preventDefault();
    try {
      let playlist = await axios.patch(
        `${process.env.REACT_APP_SITE}api/v1/playlist/add/${id}/${selectedPlaylist}`,
        {},
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );
      console.log(playlist.data.data);
      // console.log(selectedPlaylist);
      setPlaylistModal(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        if (
          error.response.data.message ==
          "video is already added to the playlist"
        ) {
          setPlaylistModal(false);
        }
      } else {
        console.log(error);
      }
    }
  };

  const fetchComments = async (pagenarion) => {
    try {
      let Comments;
      if (!pagenarion) {
        Comments = await axios.get(
          `${process.env.REACT_APP_SITE}api/v1/comment/${id}`,
          {
            headers: {
              Authorization: context.userToken,
            },
          }
        );
        console.log("page not ");
        setComments(Comments.data.data);
      } else if (pagenarion) {
        console.log("page :", page);
        Comments = await axios.get(
          `${process.env.REACT_APP_SITE}api/v1/comment/${id}?page=${page}`,
          {
            headers: {
              Authorization: context.userToken,
            },
          }
        );
        let newComments = Comments.data.data;
        // setComments({ ...comments, newComments });
        if (newComments.length == 0) {
          console.log("no new Comments");
          return;
        }
        console.log(Comments.data);
        setComments((prevComments) => [...prevComments, ...newComments]);
        setPage(page + 1);
      }

      // console.log(Comments.data);s
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const addComments = async (e) => {
    e.preventDefault();
    if (userComments.length == 0) {
      return console.log("add somthing to comments");
    }

    console.log(userComments);
    try {
      let Comments = await axios.post(
        `${process.env.REACT_APP_SITE}api/v1/comment/${id}`,
        { content: userComments },
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );
      // console.log(Comments.data);
      // fetchComments();
      let newComment = Comments.data.data;
      console.log(context.user);
      newComment.owner = {
        avatar: context.user.avatar,
        _id: context.user._id,
        username: context.user.username,
      };
      console.log(newComment);
      console.log(comments);
      setComments([newComment, ...comments]);
      setUserComments("");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };
  const deleteComment = async (e, commentId) => {
    e.preventDefault();

    if (!confirm("Are you Want To Delete This Comment ?")) {
      return;
    }
    try {
      let Comments = await axios
        .delete(`${process.env.REACT_APP_SITE}api/v1/comment/c/${commentId}`, {
          headers: {
            Authorization: context.userToken,
          },
        })
        .then(
          setComments((prevComments) =>
            prevComments.filter((comment) => comment._id !== commentId)
          )
        );
      // if (Comments.data.data.deletedCount == 1) {
      // }
      // fetchComments();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="videoDisplay flex ">
        <div className="w-4/6 h-100  rounded-2xl m-4 overflow-hidden ">
          <video
            width={"100%"}
            // height={"50%"}
            className="rounded-2xl"
            controls
            controlsList="nodownload"
            onDurationChange={() => addViews()}
            src={video?.videoFile}
            autoPlay={true}
            ref={videoEl}
            onLoadedMetadata={handleLoadedMetadata}
          />
          <div className="ml-2 mt-2 w-full">
            <h1 className="text-2xl font-bold ">{video?.title}</h1>
            <div className="wholeLine flex mt-3 justify-between items-center gap-5">
              <div className="inner flex mt-3 items-center gap-5">
                <div className="flex gap-3 items-center">
                  <Link to={`/channel/${channelDetail.username}`}>
                    <img
                      className="rounded-full w-[40px] h-[40px]"
                      src={channelDetail.avatar}
                    />
                  </Link>
                  <div>
                    <h2 className="font-bold ml-1">
                      <Link to={`/channel/${channelDetail.username}`}>
                        {channelDetail.username}
                      </Link>
                    </h2>
                    <h2>{channelDetail.subscriber} Subscriber</h2>
                  </div>
                </div>
                <Button
                  onClick={() => toggalSubscribeChannel(channelDetail._id)}
                  style={
                    channelDetail.subscribe == true
                      ? {
                          background: "white",
                          fontWeight: "bold",
                          color: "#000",
                          borderRadius: "30px",
                        }
                      : {
                          background: "red",
                          color: "white",
                          fontWeight: "600",
                          borderRadius: "30px",
                        }
                  }
                >
                  {channelDetail.subscribe == true ? "Subscribed" : "Subscribe"}
                </Button>
              </div>
              <div className="bg-gray-950 flex gap-1 rounded-full p-1  mr-5">
                {video?.isUserLiked ? (
                  <IconButton
                    onClick={() => toggalLikeVideo()}
                    className="flex gap-2 "
                    size="small"
                    color="inherit"
                  >
                    <ThumbUpIcon />
                    {video?.Like == 0 ? "" : video?.Like}
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => toggalLikeVideo()}
                    className="flex gap-2 "
                    size="small"
                    color="inherit"
                  >
                    <ThumbUpOffAltIcon />
                    {video?.Like == 0 ? "" : video?.Like}
                  </IconButton>
                )}
                <div className="w-[2px] min-h-full bg-slate-600" />
                <IconButton
                  className="flex gap-2 "
                  size="small"
                  color="inherit"
                  onClick={() => setPlaylistModal(true)}
                >
                  <TurnedInNotIcon />
                </IconButton>

                {/* start modal */}
                {playlist?.length > 0 && (
                  <div
                    className={`${
                      playlistModal == true ? "block" : "hidden"
                    } flex  fixed  top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full`}
                  >
                    {/* <!--backDrop--!> */}
                    <div
                      id="authentication-modal"
                      tabIndex="-1"
                      className="bg-gray-800 opacity-[0.9] fixed w-full md:inset-0 h-full  "
                      aria-hidden="true"
                      onClick={() => setPlaylistModal(false)}
                    />
                    <div className="relative mx-auto p-4   max-h-full">
                      {/* <!-- Modal content --> */}
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        {/* <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Create New Playlist
                        </h3>
                        <button
                          onClick={() => setPlaylistModal(false)}
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
                      </div> */}
                        {/* <!-- Modal body --> */}
                        <div className="p-4 md:p-5">
                          <form
                            className="space-y-4"
                            // onSubmit={(e) => handalCreatePlaylist(e)}
                          >
                            {playlist?.map((ite, index) => (
                              <div
                                key={index}
                                className="flex items-center mb-4"
                              >
                                <input
                                  id="default-radio-1"
                                  type="radio"
                                  value={selectedPlaylist}
                                  name="default-radio"
                                  onChange={() => setSelectedPlaylist(ite._id)}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 hover:cursor-pointer"
                                ></input>
                                <label
                                  htmlFor="default-radio-1"
                                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  {ite.name}
                                </label>
                              </div>
                            ))}

                            <button
                              type="submit"
                              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              onClick={(e) => handalAddVideoToPlaylist(e)}
                            >
                              Add Video To Playlist
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* End modal */}
              </div>
            </div>
            <div className="mt-4 p-3 bg-slate-800 rounded-md">
              <div className="flex gap-3 font-bold">
                <h3>{video?.views} views</h3>
                <h3>
                  {video?.createdAt &&
                    formatDistanceToNow(new Date(video?.createdAt), {
                      addSuffix: true,
                    })}{" "}
                  {/* {video?.createdAt} */}
                </h3>
                {/* <h3>{video?.createdAt}</h3> */}
                <h3>{channelDetail.fullName}</h3>
              </div>
              <div className="description">
                <h4>{video?.description}</h4>
              </div>
              <div className="flex mt-3 bg-gray-900 p-2 rounded-md flex-col gap-2">
                <h2 className="text-xl">{comments?.length} Comments..</h2>
                <form onSubmit={(e) => addComments(e)} className="flex  gap-2">
                  <input
                    className="shadow appearance-none border bg-gray-800 rounded w-2/5 py-2 px-3 text-gray-50 leading-tight focus:outline-none focus:shadow-outline"
                    id="comments"
                    type="text"
                    value={userComments}
                    onChange={(e) => setUserComments(e.target.value)}
                    placeholder="Add comment..."
                  />
                  <Button type="submit" variant="outlined" color="inherit">
                    Add comment
                  </Button>
                </form>
                {comments?.length !== 0 &&
                  comments?.map((ite, index) => (
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <img
                          className="w-[40px] h-[40px] rounded-full aspect-square"
                          src={ite.owner.avatar}
                        />
                        <div>
                          <h2 className="text-xs font-light">
                            {ite.owner.username} ~{" "}
                            {formatDistanceToNow(new Date(ite?.createdAt), {
                              addSuffix: true,
                            })}
                          </h2>
                          <h2 className="font-medium">{ite.content}</h2>
                        </div>
                      </div>
                      <div>
                        {ite.owner._id == context.user._id && (
                          <Button onClick={(e) => deleteComment(e, ite._id)}>
                            Delete Comment
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                <Button onClick={() => fetchComments(page + 1)}>
                  <RefreshIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 m-4">
          <h3>other Video you like</h3>
          <div className="container border-[1px] rounded-2xl p-2">
            {subvideo?.map((ite, index) => (
              <div
                key={index}
                className="w-full  my-2 flex gap-2 hover:bg-slate-800 rounded-xl"
              >
                <div className="  rounded-xl  object-cover overflow-hidden">
                  <Link to={`/video/${ite._id}`}>
                    <img
                      src={ite.thubnail}
                      className="aspect-video h-[115px] w-auto object-cover"
                    />
                  </Link>
                </div>
                <div className="info w-9/12">
                  <h4>
                    <Link key={index} to={`/video/${ite._id}`}>
                      {ite.title}
                    </Link>
                  </h4>
                  <h6 className="text-slate-500">
                    <Link to={`/channel/${ite.owner.username}`}>
                      {ite.owner.username}
                    </Link>
                  </h6>
                  <p className="text-slate-500	">
                    {ite.views} views ~
                    {formatDistanceToNow(new Date(ite.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDisplay;
