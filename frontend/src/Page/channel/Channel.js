import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Mycontext } from "../../App";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Button } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";

import { toast } from "react-toastify";

const Channel = () => {
  const { channelId } = useParams();
  const context = useContext(Mycontext);
  const [channel, setChannel] = useState();
  let [backImg, setBackImg] = useState();
  let [isSubscribed, setIsSubscribed] = useState();
  const [channelVideos, setChannelVideos] = useState(null);

  //   console.log(channel);

  let chan = {
    _id: "665d3bc7702e1c174341fbff",
    username: "jayu",
    email: "jayu@j.co",
    fullName: "jayuPatel",
    avatar:
      "https://res.cloudinary.com/dygl9cjyd/image/upload/v1718210125/sj6svbmwgdbgxw0p7iv6.png",
    coverImage:
      "https://yt3.googleusercontent.com/q7BE5w-MYDJyTMQWKwVmp98JvU7WqEzd99W-7I8CwJM3ixt-sQEeEKtlp1Xnho-42TCOsQt2=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
    // coverImage:
    //   "https://as1.ftcdn.net/v2/jpg/03/76/22/02/1000_F_376220284_p51w00DFKeGWQR9nz0XQ2vHjK4poiL5O.jpg",
    subscriberCount: 2,
    channelSubscibedToCount: 2,
    isSubscribed: false,
    videos: 200,
  };
  let fackVideo = [
    {
      _id: "66602a90cbb536a3ddcb99ef",
      videoFile:
        "http://res.cloudinary.com/dygl9cjyd/video/upload/v1717578382/uyjcbuo6ylxn8kweuc1o.mp4",
      thubnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      title: "amezing Video",
      description: "this is amezing video website",
      duration: 8.2,
      views: 21,
      isPublished: true,
      owner: {
        _id: "6668084a29c67df5d8fee3ce",
        username: "aaa",
        email: "kaxaf81276@kernuo.com",
        avatar:
          "http://res.cloudinary.com/dygl9cjyd/image/upload/v1718093899/foit6k5stngdtijbri8t.jpg",
      },
      createdAt: "2024-06-05T09:06:24.408Z",
      updatedAt: "2024-06-18T12:40:43.176Z",
    },
  ];
  useEffect(() => {
    fetchChannel();
  }, []);

  const fetchChannel = async () => {
    try {
      context.setLoading(true);
      let response = await axios.get(
        `${process.env.REACT_APP_SITE}api/v1/users/channel/${channelId}`,
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );

      context.setLoading(false);
      if (response.data.success == true) {
        //fetch videos of channel
        let videocount;
        try {
          let videosCount = await axios.get(
            `${process.env.REACT_APP_SITE}api/v1/video/getvideocount/${response.data.data._id}`,
            {
              headers: {
                Authorization: context.userToken,
              },
            }
          );
          // console.log(videosCount.data.data);
          if (videosCount.data.success == true) {
            videocount = videosCount.data.data;
          }
        } catch (error) {
          if (error.response.data) {
            console.log(error.response.data);
          } else {
            console.log(error);
          }
        }
        // console.log(response.data);
        const CHANNEL = response.data.data;
        setChannel({ ...CHANNEL, videos: videocount });
        setBackImg(response.data.data.coverImage);
        setIsSubscribed(response.data.data.isSubscribed);
        fetchChannelVideos(CHANNEL._id);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const toggalSubscribeChannel = async () => {
    // console.log(channel._id);
    let channelId = channel._id;
    try {
      context.setLoading(true);
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
        // console.log(response.data);
        getSubscriber(channelId);
        console.log(response.data.message);
        if (response.data.message == "Subscribed successfully") {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 1700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          toast.info(response.data.message, {
            position: "top-right",
            autoClose: 1700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }

        setIsSubscribed(!isSubscribed);
        // setChannel(response.data.data);
        // setBackImg(response.data.data.coverImage);
        // setIsSubscribed(response.data.data.isSubscribed);
      }
      context.setLoading(false);
    } catch (error) {
      setIsSubscribed(isSubscribed);
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const getSubscriber = async (channelId) => {
    try {
      context.setLoading(true);
      let response = await axios.get(
        `${process.env.REACT_APP_SITE}api/v1/subscriptions/c/${channelId}`,
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );
      if (response.data.success == true) {
        // setIsSubscribed(!isSubscribed);
        // console.log(response.data.message);
        // console.log(channel);

        setChannel({ ...channel, subscriberCount: response.data.message });
      }
      context.setLoading(false);
    } catch (error) {
      setIsSubscribed(isSubscribed);
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const fetchChannelVideos = async (chhId) => {
    try {
      context.setLoading(true);
      let videos = await axios.get(
        `${process.env.REACT_APP_SITE}api/v1/video?userId=${chhId}`,
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );
      if (videos.data.success == true) {
        // console.log(videos.data.data);
        setChannelVideos(videos.data.data);
      }
      context.setLoading(false);
    } catch (error) {
      if (error.response.data) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      {channel && (
        <div className="container mx-auto overflow-hidden pb-7 rounded-md bg-gray-800">
          <div className="w-full">
            <img
              className="w-full p-3 rounded-3xl h-[250px] object-cover"
              src={channel?.coverImage}
              onError={(e) =>
                (e.target.src =
                  "https://yt3.googleusercontent.com/q7BE5w-MYDJyTMQWKwVmp98JvU7WqEzd99W-7I8CwJM3ixt-sQEeEKtlp1Xnho-42TCOsQt2=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj")
              }
              alt={channel?.username}
            />
          </div>
          <div className="channelHeader mt-3 ml-4">
            <div className="channeldescription flex gap-6 items-center">
              <div className="flex flex-col justify-center gap-3 ">
                <img
                  className="h-[160px]   mr-3 w-[160px] rounded-full"
                  src={channel?.avatar}
                  onError={(e) =>
                    (e.target.src =
                      "https://w7.pngwing.com/pngs/612/280/png-transparent-customer-user-userphoto-account-person-glyphs-icon.png")
                  }
                />
                {isSubscribed == false ? (
                  <Button
                    onClick={() => toggalSubscribeChannel()}
                    style={{
                      background: "red",
                      fontWeight: "bold",
                      color: "#fff",
                      borderRadius: "30px",
                    }}
                  >
                    SubScribe
                  </Button>
                ) : (
                  <Button
                    onClick={() => toggalSubscribeChannel()}
                    style={{
                      background: "white",
                      fontWeight: "bold",
                      color: "#000",
                      borderRadius: "30px",
                    }}
                  >
                    SubScribed
                  </Button>
                )}
              </div>

              <div className="flex flex-col  justify-start">
                <h1 className="text-4xl  font-bold"> {channel?.fullName}</h1>
                <h1 className="text-xl  ">
                  @{channel?.username}{" "}
                  <FiberManualRecordIcon style={{ fontSize: "7px" }} />{" "}
                  {channel?.subscriberCount} subscribers{" "}
                  <FiberManualRecordIcon style={{ fontSize: "7px" }} />{" "}
                  {channel?.videos} videos
                </h1>
              </div>
            </div>
          </div>

          {channelVideos?.length !== 0 && (
            <div className="container p-3  ">
              <h3 className="text-2xl font-bold">Channel Videos</h3>
              <div className="my-3 flex flex-col gap-3">
                {channelVideos?.map((ite, index) => (
                  // <Link>
                  <Link key={index} to={`/video/${ite._id}`}>
                    <div
                      className="w-full flex gap-2 h-[200px] hover:bg-slate-900 rounded-xl"
                      key={index}
                    >
                      <div className="w-1/3 overflow-hidden">
                        <img
                          className="h-full w-full object-cover aspect-video rounded-md"
                          src={ite.thubnail}
                        />
                      </div>
                      <div className="w-2/3 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl capitalize font-semibold">
                            {ite.title}
                          </h3>
                          <h3 className="text-xl capitalize ">
                            {ite.description}
                          </h3>
                          <div className="flex items-center font-semibold gap-2 h-[40px] my-2">
                            <div className="h-[40px] w-[40px]">
                              <img
                                className="rounded-full object-cover aspect-square"
                                src={ite.owner.avatar}
                              />
                            </div>
                            <h3 className="text-xl  ">{ite.owner.username}</h3>
                          </div>
                          <h3 className="text-sm capitalize flex items-center gap-2">
                            {ite.views} views{" "}
                            <FiberManualRecord style={{ fontSize: "7px" }} />
                            {formatDistanceToNow(new Date(ite.createdAt), {
                              addSuffix: true,
                            })}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Channel;
