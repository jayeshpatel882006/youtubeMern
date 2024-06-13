import React, { useContext, useEffect, useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { Button } from "@mui/material";
import { Mycontext } from "../../App";

const Home = () => {
  const context = useContext(Mycontext);
  const [video, setvideo] = useState();
  const subVideo = [
    {
      name: "amezing video on entier pateltubamezing video on entier pateltubee aohsfuihruighuighghiafefqfqfqfqfqfgqgfqgqgqg",
      thumbnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      owner: "Patel",
      views: 222,
      cretedAt: "2024-06-05T09:06:24.408Z",
      userPhoto:
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    {
      name: "amezing video on entier pateltube",
      thumbnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      owner: "Patel",
      views: 222,
      cretedAt: "2024-06-10T12:11:56.105Z",
      userPhoto:
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    {
      name: "amezing video on entier pateltube",
      thumbnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      owner: "Patel",
      views: 222,
      cretedAt: "2024-06-10T12:11:56.105Z",
      userPhoto:
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    {
      name: "amezing video on entier pateltube",
      thumbnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      owner: "Patel",
      views: 222,
      cretedAt: "2024-06-10T12:11:56.105Z",
      userPhoto:
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    {
      name: "on entier pateltube amezing gahsfdfg",
      thumbnail:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/free-youtube-thumbnail-maker-online-design-template-b0d0e1050e510fc2784b90d522d5bbe5_screen.jpg?ts=1662402001",
      owner: "Patel",
      views: 24452,
      cretedAt: "2024-06-10T12:11:56.105Z",
      userPhoto:
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    {
      name: "amezing lorem ipsum",
      thumbnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      owner: "Patel",
      views: 502,
      cretedAt: "2024-06-10T12:11:56.105Z",
      userPhoto:
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    {
      name: "amezing video on entier pateltube",
      thumbnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      owner: "Patel",
      views: 222,
      cretedAt: "2024-06-10T12:11:56.105Z",
      userPhoto:
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    {
      name: "amezing pochinki pe kese vaar kaer bgm totorial",
      thumbnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      owner: "Patel",
      views: 2,
      cretedAt: "2024-06-10T12:11:56.105Z",
      userPhoto:
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    {
      name: "on entier pateltube amezing gahsfdfg",
      thumbnail:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/free-youtube-thumbnail-maker-online-design-template-b0d0e1050e510fc2784b90d522d5bbe5_screen.jpg?ts=1662402001",
      owner: "Patel",
      views: 24452,
      cretedAt: "2024-06-10T12:11:56.105Z",
      userPhoto:
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    {
      name: "amezing pochinki pe kese vaar kaer bgm totorial",
      thumbnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      owner: "Patel",
      views: 2,
      cretedAt: "2024-06-10T12:11:56.105Z",
      userPhoto:
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    {
      name: "amezing lorem ipsum",
      thumbnail:
        "http://res.cloudinary.com/dygl9cjyd/image/upload/v1717578383/r98lvufhxoqxudfjx586.jpg",
      owner: "Patel",
      views: 502,
      cretedAt: "2024-06-10T12:11:56.105Z",
      userPhoto:
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    {
      name: "on entier pateltube amezing gahsfdfg",
      thumbnail:
        "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/free-youtube-thumbnail-maker-online-design-template-b0d0e1050e510fc2784b90d522d5bbe5_screen.jpg?ts=1662402001",
      owner: "Patel",
      views: 24452,
      cretedAt: "2024-06-10T12:11:56.105Z",
      userPhoto:
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
  ];

  useEffect(() => {
    fetchVideo();
  }, []);

  const fetchVideo = async () => {
    // console.log(context.userToken);
    try {
      let res = await axios.get(`${process.env.REACT_APP_SITE}api/v1/video`, {
        headers: {
          Authorization: context.userToken,
        },
      });

      console.log(res.data.data);
      setvideo(res.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="container mx-auto bg-gray-800 p-10 m-10 rounded-md">
      <div className="latest">
        <h3 className="text-2xl font-bold mb-3">Latest</h3>
        <div className=" mx-auto flex justify-center flex-wrap  h-auto">
          {video?.map((ite, index) => (
            <div
              className="p-1 w-1/4 flex flex-col gap-2 hover:bg-slate-700 rounded-xl"
              key={index}
            >
              <div className="w-full rounded-xl  object-cover overflow-hidden">
                <Link to={`/video/${ite._id}`}>
                  <img
                    src={ite.thubnail}
                    className="w-full h-auto aspect-video object-cover"
                  />
                </Link>
              </div>
              <div className="info flex-1">
                <div className="flex gap-2 w-full">
                  <Link className="shrink-0">
                    <img
                      style={{ height: "35px", width: "35px" }}
                      className="rounded-full"
                      src={ite.owner?.avatar}
                    />
                  </Link>
                  <div>
                    <Link to={`/video/${ite._id}`}>
                      <h4 className="text-lg">
                        {ite.title.length > 50
                          ? ite.title.substring(0, 50) + "..."
                          : ite.title}
                      </h4>
                    </Link>
                    <h6 className="text-slate-500	">
                      <Link to={`/channel/${ite.owner.username}`}>
                        {ite.owner.username}
                      </Link>
                    </h6>
                    <p className="text-slate-500	">
                      {ite.views} views{" "}
                      <FiberManualRecordIcon style={{ fontSize: "7px" }} />{" "}
                      {formatDistanceToNow(new Date(ite.createdAt), {
                        addSuffix: true,
                      })}
                      {/* {ite.cretedAt} */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
