import { Button } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Mycontext } from "../../App";
import { formatDistanceToNow } from "date-fns";

const VideoDisplay = () => {
  let { id } = useParams();
  const videoEl = useRef(null);

  const context = useContext(Mycontext);
  const [video, setVideo] = useState();
  const [subvideo, setSubVideo] = useState([]);
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
      setVideo(res.data.data[0]);
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
            <div className="flex mt-3 items-center gap-5">
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
