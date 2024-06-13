import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Mycontext } from "../../App";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Button } from "@mui/material";

const Channel = () => {
  const { channelId } = useParams();
  const context = useContext(Mycontext);
  const [channel, setChannel] = useState();
  let [backImg, setBackImg] = useState();

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
  };

  useEffect(() => {
    fetchChannel();
  }, []);

  const fetchChannel = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_SITE}api/v1/users/channel/${channelId}`,
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );
      console.log(response.data);
      setChannel(response.data.data);
      setBackImg(response.data.data.coverImage);
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
      {channel && (
        <div className="container mx-auto overflow-hidden pb-7 rounded-md bg-gray-800">
          <div className="w-full">
            <img
              className="w-full p-3 rounded-3xl h-[250px] object-cover"
              src={channel?.coverImage}
              onError={() =>
                setBackImg(
                  "https://yt3.googleusercontent.com/q7BE5w-MYDJyTMQWKwVmp98JvU7WqEzd99W-7I8CwJM3ixt-sQEeEKtlp1Xnho-42TCOsQt2=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
                )
              }
              alt={channel?.username}
            />
          </div>
          <div className="channelHeader mt-3 ml-4">
            <div className="channeldescription flex items-center">
              <div className="flex flex-col justify-center gap-3 ">
                <img
                  className="h-[160px]   mr-3 w-[160px] rounded-full"
                  src={channel?.avatar}
                />
                {channel?.isSubscribed == false ? (
                  <Button
                    style={{
                      background: "red",
                      color: "#fff",
                      borderRadius: "30px",
                    }}
                  >
                    SubScribe
                  </Button>
                ) : (
                  <Button
                    style={{
                      background: "white",
                      color: "#000",
                      borderRadius: "30px",
                    }}
                  >
                    SubScribed
                  </Button>
                )}
              </div>

              <div className="flex flex-col items-center justify-start">
                <h1 className="text-4xl  font-bold"> {channel?.fullName}</h1>
                <h1 className="text-xl  ">
                  @{channel?.username}{" "}
                  <FiberManualRecordIcon style={{ fontSize: "7px" }} />{" "}
                  {channel?.subscriberCount} subscribers
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Channel;
