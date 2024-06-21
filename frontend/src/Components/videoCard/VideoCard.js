import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ ite, index }) => {
  return (
    <div
      className="p-1 w-1/4 h-[333px] flex flex-col gap-2 hover:p-0 hover:bg-slate-700 rounded-xl"
      key={index}
    >
      <div className="w-full rounded-xl  h-3/4  object-cover overflow-hidden">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
