import React from "react";
import { formatDistanceToNow } from "date-fns";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const PlaylistCard = ({ ite, handalDeletePlaylist }) => {
  return (
    <div className="bg-gray-900 w-1/5 rounded-md overflow-hidden ">
      <div className="w-full h-[180px]">
        <Link to={ite.videoId !== null ? `/video/${ite.videoId}` : ""}>
          <img
            src={ite.thumbnail}
            className="h-full w-full aspect-video object-cover"
          />
        </Link>
      </div>
      <h3 className="text-xl font-bold flex items-center gap-2">
        {ite.name} <FiberManualRecord style={{ fontSize: "10px" }} />{" "}
        <p className="text-base">{ite.numberOfVideo} videos</p>
      </h3>
      <h3>{ite.owner.username}</h3>
      <h3> {ite.description}</h3>
      <h3 className="text-xs">
        Created :{" "}
        {formatDistanceToNow(new Date(ite.createdAt), {
          addSuffix: true,
        })}{" "}
        <FiberManualRecord style={{ fontSize: "5px" }} /> Updated :{" "}
        {formatDistanceToNow(new Date(ite.updatedAt), {
          addSuffix: true,
        })}
      </h3>
      <div className="flex justify-between">
        <Link to={`/user/playlist/${ite._id}`}>
          <Button color="inherit"> View Full Playlist</Button>
        </Link>
        <Button color="error" onClick={() => handalDeletePlaylist(ite._id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PlaylistCard;
