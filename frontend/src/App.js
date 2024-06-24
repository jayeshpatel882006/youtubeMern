import { createContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

import Footer from "./Components/footer/Footer";
import Header from "./Components/header/Header";
import LoginSignup from "./Page/Login-Signup/LoginSignup";
import VideoDisplay from "./Page/videoDisplay/VideoDisplay";
import Home from "./Page/Home/Home";
import Channel from "./Page/channel/Channel";
import Subscription from "./Page/Subscription/Subscription";
import Setting from "./Page/setting/Setting";
import Activity from "./Page/Activity/Activity";
import Playlist from "./Page/Playlist/Playlist";
import UserPlaylist from "./Page/UserPlaylist/UserPlaylist";

const Mycontext = createContext();

function App() {
  let id = window.localStorage.getItem("_id");
  const [loading, setLoading] = useState(false);
  const [isLogedin, setIsLogedin] = useState(
    id?.length !== 0 && id !== null ? true : false
  );
  const [userToken, setToken] = useState(localStorage.getItem("token"));
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );
  const [user, setUser] = useState();
  const [subvideos, setSubVideo] = useState();
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // let id = window.localStorage.getItem("_id");
    setToken(localStorage.getItem("token"));
    setRefreshToken(localStorage.getItem("refreshToken"));
    // console.log(id);

    fetchCurrentUser();
    if (id !== null && id.length !== 0) {
      return setIsLogedin(true);
      //  navigate("/");
    } else if (isLogedin == false) {
      navigate("/auth/login");
      setToken("");
    }
  }, []);
  // useEffect(() => {

  // }, []);

  const UPDATErefreshToken = async () => {
    try {
      // console.log(refreshToken);
      let res = await axios.post(
        `${process.env.REACT_APP_SITE}api/v1/users/refreshtoken`,
        {
          refreshToken,
        }
      );
      // console.log("UPDATEREFRESHTOKEN ", res.data.data);
      if (res.data.data) {
        localStorage.setItem("refreshToken", res.data.data.refreshToken);
        // console.log(res.data.data.refreshToken, res.data.data.user);
        setRefreshToken(res.data.data.refreshToken);
        setUser(res.data.data.user);
        setToken(res.data.data.accessToken);
        // fetchCurrentUser();
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err);
      }
    }
  };

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      // console.log(userToken);

      let user = await axios.get(
        `${process.env.REACT_APP_SITE}api/v1/users/getcurrentuser`,
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      // console.log(user.data.data);
      setUser(user.data.data);
      setLoading(false);
    } catch (error) {
      if (error.response) {
        ////geahuihik
        if (error.response.data.message == "jwt expired") {
          UPDATErefreshToken();
          console.log(error.response.data);
        }
        // console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const handalLogout = () => {
    setUser();
    setIsLogedin(false);
    setToken("");
    window.localStorage.removeItem("_id");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("refreshToken");

    navigate("/auth/login");
  };
  const handalLogin = (data) => {
    setUser(data.user);
    setIsLogedin(true);
    setToken(data.token);
    setRefreshToken(data.user.refreshToken);
    // console.log(data.user);
    window.localStorage.setItem("_id", data.user._id);
    window.localStorage.setItem("refreshToken", data.user.refreshToken);
    window.localStorage.setItem("token", data.token);
    setShowHeaderFooter(true);
  };

  const value = {
    isLogedin,
    userToken,
    user,
    subvideos,
    loading,
    setLoading,
    setSubVideo,
    fetchCurrentUser,
    handalLogin,
    setIsLogedin,
    handalLogout,
    setShowHeaderFooter,
  };

  // console.log(isLogedin);

  return (
    <Mycontext.Provider value={value}>
      <div className="dark:bg-gray-900 flex flex-col min-h-screen justify-between text-white">
        {showHeaderFooter == true && <Header />}
        <div
          className={`${
            loading !== true ? "hidden" : ""
          }  z-50 overflow-hidden`}
        >
          <div
            id="authentication-modal"
            tabIndex="-1"
            className="bg-gray-800 opacity-[0.9] fixed w-full md:inset-0 h-full overflow-hidden  "
            aria-hidden="true"
            // onClick={() => setShowModal(false)}
          />
          <div className="flex overflow-hidden top-0 left-0 items-center justify-center w-screen  h-screen border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>

        <div className="flex-grow">
          <Routes>
            <Route exact={true} path="/" element={<Home />} />
            <Route exact={true} path="/auth/login" element={<LoginSignup />} />
            <Route exact={true} path="/video/:id" element={<VideoDisplay />} />
            <Route exact={true} path="/user/setting" element={<Setting />} />
            <Route exact={true} path="/user/activity" element={<Activity />} />
            <Route exact={true} path="/user/playlist" element={<Playlist />} />
            <Route
              exact={true}
              path="/user/playlist/:playlistId"
              element={<UserPlaylist />}
            />
            <Route
              exact={true}
              path="/user/subscription"
              element={<Subscription />}
            />
            <Route
              exact={true}
              path="/channel/:channelId"
              element={<Channel />}
            />
          </Routes>
        </div>
        {/* <VideoDisplay /> */}
        {showHeaderFooter == true && <Footer />}
        {/* > */}
      </div>
    </Mycontext.Provider>
  );
}

export default App;
export { Mycontext };



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYyYmQxYzJmYTYwMzJmMjUyNTJkMzYiLCJpYXQiOjE3MTg4OTgxNDcsImV4cCI6MTcxOTc2MjE0N30.KL6npGXEaVBwdsfwnJO0zir03ZAn_QydQfIV7us78GE

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjYyYmQxYzJmYTYwMzJmMjUyNTJkMzYiLCJlbWFpbCI6ImFAYS5jbyIsImZ1bGxOYW1lIjoia2FsdWthZnVuZGEiLCJ1c2VybmFtZSI6ImthbHUiLCJpYXQiOjE3MTg3Nzk3NTgsImV4cCI6MTcxODg2NjE1OH0.Z0pDwlT1aA0O4rIpO0e7Ebdu8mRvaMIcpDApNMz5SMk