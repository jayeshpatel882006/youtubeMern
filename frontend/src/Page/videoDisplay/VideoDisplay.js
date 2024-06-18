import { Button } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Mycontext } from "../../App";
import { formatDistanceToNow } from "date-fns";

const VideoDisplay = () => {
  let { id } = useParams();
  const videoEl = useRef(null);

  const context = useContext(Mycontext);
  const [video, setVideo] = useState();
  // console.log(id);
  const subVideo = [
    {
      name: "amezing video on entier pateltube",
      thumbnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      owner: "Patel",
      views: 222,
      cretedAt: "63 days ago",
    },
    {
      name: "amezing video on entier pateltube",
      thumbnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      owner: "Patel",
      views: 222,
      cretedAt: "63 days ago",
    },
    {
      name: "amezing video on entier pateltube",
      thumbnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      owner: "Patel",
      views: 222,
      cretedAt: "63 days ago",
    },
    {
      name: "amezing video on entier pateltube",
      thumbnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      owner: "Patel",
      views: 222,
      cretedAt: "63 days ago",
    },
    {
      name: "on entier pateltube amezing gahsfdfg",
      thumbnail:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/free-youtube-thumbnail-maker-online-design-template-b0d0e1050e510fc2784b90d522d5bbe5_screen.jpg?ts=1662402001",
      owner: "Patel",
      views: 24452,
      cretedAt: "34 days ago",
    },
    {
      name: "amezing lorem ipsum",
      thumbnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      owner: "Patel",
      views: 502,
      cretedAt: "23 days ago",
    },
    {
      name: "amezing video on entier pateltube",
      thumbnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      owner: "Patel",
      views: 222,
      cretedAt: "63 days ago",
    },
    {
      name: "amezing pochinki pe kese vaar kaer bgm totorial",
      thumbnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      owner: "Patel",
      views: 2,
      cretedAt: "21 days ago",
    },
    {
      name: "on entier pateltube amezing gahsfdfg",
      thumbnail:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/free-youtube-thumbnail-maker-online-design-template-b0d0e1050e510fc2784b90d522d5bbe5_screen.jpg?ts=1662402001",
      owner: "Patel",
      views: 24452,
      cretedAt: "34 days ago",
    },
    {
      name: "amezing pochinki pe kese vaar kaer bgm totorial",
      thumbnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      owner: "Patel",
      views: 2,
      cretedAt: "21 days ago",
    },
    {
      name: "amezing lorem ipsum",
      thumbnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      owner: "Patel",
      views: 502,
      cretedAt: "23 days ago",
    },
    {
      name: "on entier pateltube amezing gahsfdfg",
      thumbnail:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/free-youtube-thumbnail-maker-online-design-template-b0d0e1050e510fc2784b90d522d5bbe5_screen.jpg?ts=1662402001",
      owner: "Patel",
      views: 24452,
      cretedAt: "34 days ago",
    },
  ];

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

  useEffect(() => {
    fetchVideo();
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

      // console.log(res.data.data[0]);
      setVideo(res.data.data[0]);
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

    setTimeout(async () => {
      console.log("see the video", video._id);
      try {
        let res = await axios.post(
          `${process.env.REACT_APP_SITE}api/v1/video/getVideo/${video._id}`,
          {},
          {
            headers: {
              Authorization: context.userToken,
            },
          }
        );
        console.log(res.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      }
    }, handleLoadedMetadata() / 5);
  };

  const handleLoadedMetadata = () => {
    const video = videoEl.current;
    if (!video) return;
    console.log(`The video is ${video.duration / 5} seconds long.`);
    return video.duration;
  };
  //   console.log(response.data[0].videoFile);

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
                <img
                  className="rounded-full w-[40px] h-[40px]"
                  src={video?.ChhannalDetail[0].avatar}
                />
                <div>
                  <h2 className="font-bold ml-1">
                    {video?.ChhannalDetail[0].username}
                  </h2>
                  <h2>{video?.ChhannalDetail[0].subscriberCount} Subscriber</h2>
                </div>
              </div>
              <Button
                className="rounded-s-sm"
                style={{
                  background: "white",
                  color: "gray",
                  fontWeight: "600",
                }}
              >
                Subscrib
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
                <h3>{video?.ChhannalDetail[0].fullName}</h3>
              </div>
              <div className="description">
                <h4>{video?.description}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3 m-4">
          <h3>other Video you like</h3>
          <div className="container">
            {subVideo?.map((ite, index) => (
              <div
                className=" w-100 my-2 flex gap-2 hover:bg-slate-800 rounded-xl"
                key={index}
              >
                <div className="w-1/4 rounded-xl  object-cover overflow-hidden">
                  <img
                    src={ite.thumbnail}
                    className="aspect-video object-cover"
                  />
                </div>
                <div className="info">
                  <h4>{ite.name}</h4>
                  <h6 className="text-slate-500	">{ite.owner}</h6>
                  <p className="text-slate-500	">
                    {ite.views} views ~ {ite.cretedAt}
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
