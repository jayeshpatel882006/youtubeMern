import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Mycontext } from "../../App";
import VideoCard from "../../Components/videoCard/VideoCard";

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
  }, [context.user]);

  const fetchVideo = async () => {
    // console.log(context.user);
    if (context.user !== undefined) {
      try {
        context.setLoading(true);
        let res = await axios.get(`${process.env.REACT_APP_SITE}api/v1/video`, {
          headers: {
            Authorization: context.userToken,
          },
        });

        // console.log(res.data.data);
        context.setSubVideo(res.data.data);
        setvideo(res.data.data);
        context.setLoading(false);
      } catch (error) {
        // context.setLoading(false)
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="  mx-5 bg-gray-800 p-6 m-10 rounded-md">
      <div className="latest">
        <h3 className="text-2xl font-bold mb-3">Latest</h3>
        <div className=" mx-auto flex  justify-center  flex-wrap   h-auto">
          {video?.map((ite, index) => (
            <VideoCard ite={ite} index={index} />
          ))}
          {video?.map((ite, index) => (
            <VideoCard ite={ite} index={index} />
          ))}
          {video?.map((ite, index) => (
            <VideoCard ite={ite} index={index} />
          ))}
          {video?.map((ite, index) => (
            <VideoCard ite={ite} index={index} />
          ))}
          {video?.map((ite, index) => (
            <VideoCard ite={ite} index={index} />
          ))}
          {video?.map((ite, index) => (
            <VideoCard ite={ite} index={index} />
          ))}
          {video?.map((ite, index) => (
            <VideoCard ite={ite} index={index} />
          ))}
          {video?.map((ite, index) => (
            <VideoCard ite={ite} index={index} />
          ))}
          {video?.map((ite, index) => (
            <VideoCard ite={ite} index={index} />
          ))}
          {video?.map((ite, index) => (
            <VideoCard ite={ite} index={index} />
          ))}
          {video?.map((ite, index) => (
            <VideoCard ite={ite} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
