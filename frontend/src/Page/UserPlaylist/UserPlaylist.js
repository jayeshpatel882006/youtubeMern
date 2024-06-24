import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Mycontext } from "../../App";
import { formatDistanceToNow } from "date-fns";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import { Button } from "@mui/material";

const UserPlaylist = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [playlist, setplaylist] = useState();
  const context = useContext(Mycontext);
  useEffect(() => {
    fetchPlaylist();
  }, []);

  const fetchPlaylist = async () => {
    try {
      context.setLoading(true);
      let Playlist = await axios.get(
        `${process.env.REACT_APP_SITE}api/v1/playlist/${playlistId}`,
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );
      console.log(Playlist.data.data);
      setplaylist(Playlist.data.data);
      context.setLoading(false);
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

  const handalDeletePlaylist = async (e) => {
    e.preventDefault();
    if (!confirm("Are You want to delte this playlist ?")) {
      return console.log("not deleted");
    }
    if (!playlist?._id) {
      navigate("/user/playlist");
      return;
    }

    try {
      context.setLoading(true);
      let Playlist = await axios.delete(
        `${process.env.REACT_APP_SITE}api/v1/playlist/${playlist._id}`,
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );
      console.log(Playlist.data.data);
      navigate("/user/playlist");
      context.setLoading(false);
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

  const handalDeleteVideoFromVideo = async (videoId) => {
    if (!playlist?._id) {
      navigate("/user/playlist");
      return;
    }

    try {
      context.setLoading(true);
      let Playlist = await axios.patch(
        `${process.env.REACT_APP_SITE}api/v1/playlist/remove/${videoId}/${playlist._id}`,
        {},
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );
      //   console.log(Playlist.data.data);
      fetchPlaylist(Playlist.data.data);
      context.setLoading(false);
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
    <div className="bg-gray-800 w-full container mx-auto flex rounded-md p-2">
      {playlist?.videos.length !== 0 ? (
        <>
          <div className="w-3/4">
            <div className="flex gap-2 bg-gray-900 rounded-md p-1 mt-2 flex-col w-4/5 ">
              <h3 className="font-bold capitalize text-2xl">Your Videos</h3>
              {playlist?.videos.map((ite, index) => (
                <div
                  className="p-1 w-full h-[200px] flex  gap-2 hover:p-0 hover:bg-slate-700 rounded-xl"
                  key={index}
                >
                  <div className="w-1/3 rounded-xl  h-full  object-cover overflow-hidden">
                    <Link to={`/video/${ite._id}`}>
                      <img
                        src={ite.thubnail}
                        className="w-full h-full aspect-video object-cover"
                      />
                    </Link>
                  </div>
                  <div className="info h-1/4 flex-1">
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
                          <FiberManualRecord style={{ fontSize: "7px" }} />{" "}
                          {formatDistanceToNow(new Date(ite.createdAt), {
                            addSuffix: true,
                          })}
                          {/* {ite.cretedAt} */}
                        </p>
                        <Button
                          onClick={() => handalDeleteVideoFromVideo(ite._id)}
                          color="error"
                        >
                          Deleet This video
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-3/12 flex items-end flex-col">
            <img
              className="h-[250px] aspect-video rounded-md"
              src={playlist?.videos[0].thubnail}
            />
            <div className="flex flex-col items-end gap-4">
              <h2 className="font-bold capitalize text-3xl">
                {playlist?.name}
              </h2>
              <h2 className="font-bold capitalize text-base">
                {playlist?.videos.length} videos
              </h2>

              <h2 className="font-semibold capitalize text-l">
                {playlist?.description}
              </h2>
              <Button
                onClick={(e) => handalDeletePlaylist(e)}
                variant="contained"
                color="error"
              >
                Delete Playlist
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4 mx-auto p-3">
            <h2 className="text-3xl font-bold">
              This Playlist Dose Not Containe Any Video
            </h2>
            <Button
              variant="contained"
              onClick={(e) => handalDeletePlaylist(e)}
              color="error"
            >
              Delete This Playlist
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPlaylist;
