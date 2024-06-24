import { Button } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mycontext } from "../../App";
import axios from "axios";

const Subscription = () => {
  const context = useContext(Mycontext);

  const [channel, setChannel] = useState();

  useEffect(() => {
    fetchChannel();
  }, []);

  const fetchChannel = async () => {
    try {
      context.setLoading(true);
      let response = await axios.get(
        `${process.env.REACT_APP_SITE}api/v1/subscriptions/u/subscribedchannel`,
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );
      if (response.data.success == true) {
        // console.log(response.data);
        setChannel(response.data.data);
        // setBackImg(response.data.data.coverImage);
        // setIsSubscribed(response.data.data.isSubscribed);
      }
      context.setLoading(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const toggalSubscribeChannel = async (channelId, name) => {
    // console.log(channel._id);
    // let channelId = channel._id;
    // confirm(`Are You want to UnSunscribe ${name}`);
    if (confirm(`Are You want to UnSunscribe ${name}`) == true) {
      // console.log("You pressed OK!");
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
          // setIsSubscribed(!isSubscribed);
          console.log(response.data);
          fetchChannel();
          // getSubscriber(channelId);
          // setChannel(response.data.data);
          // setBackImg(response.data.data.coverImage);
          // setIsSubscribed(response.data.data.isSubscribed);
        }
        context.setLoading(false);
      } catch (error) {
        //   setIsSubscribed(isSubscribed);
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      }
    }
  };

  const handleImageError = (e) => {
    e.target.src =
      "https://w7.pngwing.com/pngs/612/280/png-transparent-customer-user-userphoto-account-person-glyphs-icon.png";
  };

  return (
    <div className="container mx-auto p-4 rounded-2xl bg-gray-800">
      <h1>Your Subscribed Channel</h1>
      <div className="channelContainer ">
        {channel?.map((ite, index) => (
          <div key={index}>
            <div className="flex my-3 items-center justify-between">
              <div className="flex gap-5">
                <img
                  src={ite.avatar}
                  onError={handleImageError}
                  className="h-[150px] w-[150px] rounded-full"
                />
                <div>
                  <h3 className="text-3xl font-semibold">{ite.fullName}</h3>
                  <h4>
                    <Link to={`/channel/${ite.username}`} className="text-xl">
                      @{ite.username}
                    </Link>
                  </h4>
                </div>
              </div>
              <div>
                <Button
                  onClick={() => toggalSubscribeChannel(ite._id, ite.fullName)}
                  style={{
                    background: "white",
                    fontWeight: "bold",
                    color: "#000",
                    borderRadius: "30px",
                  }}
                >
                  SubScribed
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;

//let data = [
//     {
//       _id: "665d3bc7702e1c174341fbff",
//       username: "jayu",
//       email: "jayu@j.co",
//       fullName: "jayuPatel",
//       avatar:
//         "https://res.cloudinary.com/dygl9cjyd/image/upload/v1718210125/sj6svbmwgdbgxw0p7iv6.png",
//     },
//     {
//       _id: "6668084a29c67df5d8fee3ce",
//       username: "aaa",
//       email: "kaxaf81276@kernuo.com",
//       fullName: "efegfrg",
//       avatar:
//         "http://res.cloudinary.com/dygl9cjyd/image/upload/v1718093899/foit6k5stngdtijbri8t.jpg",
//     },
//     {
//       _id: "6662bd1c2fa6032f25252d36",
//       username: "kalu",
//       email: "kalu.@k.co",
//       fullName: "kalukafunda",
//       avatar:
//         "http://res.cloudinary.com/dygl9cjyd/image/upload/v1718210125/sj6svbmwgdbgxw0p7iv6.png",
//     },
//   ];
