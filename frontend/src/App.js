import { createContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import Footer from "./Components/footer/Footer";
import Header from "./Components/header/Header";
import LoginSignup from "./Page/Login-Signup/LoginSignup";
import VideoDisplay from "./Page/videoDisplay/VideoDisplay";
import Home from "./Page/Home/Home";
import axios from "axios";
import Channel from "./Page/channel/Channel";
import Subscription from "./Page/Subscription/Subscription";
import Setting from "./Page/setting/Setting";

const Mycontext = createContext();

function App() {
  let id = window.localStorage.getItem("_id");
  const [isLogedin, setIsLogedin] = useState(
    id?.length !== 0 && id !== null ? true : false
  );
  const [userToken, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState();
  const [showHeaderFooter, setShowHeaderFooter] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // let id = window.localStorage.getItem("_id");
    setToken(localStorage.getItem("token"));
    // console.log(id);
    if (id !== null && id.length !== 0) {
      fetchCurrentUser();
      return setIsLogedin(true);
      //  navigate("/");
    } else if (isLogedin == false) {
      navigate("/auth/login");
      setToken("");
    }
  }, []);
  // useEffect(() => {

  // }, []);

  const fetchCurrentUser = async () => {
    try {
      let user = await axios.get(
        `${process.env.REACT_APP_SITE}api/v1/users/getcurrentuser`,
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      console.log(user.data.data);
      setUser(user.data.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  const handalLogout = () => {
    setIsLogedin(false);
    window.localStorage.removeItem("_id");
    window.localStorage.removeItem("token");

    setToken("");
    navigate("/auth/login");
  };
  const handalLogin = (data) => {
    setIsLogedin(true);
    setToken(data.token);
    console.log(data.user);
    setUser(data.user);
    window.localStorage.setItem("_id", data.user._id);
    window.localStorage.setItem("token", data.token);
    setShowHeaderFooter(true);
  };

  const value = {
    isLogedin,
    userToken,
    user,
    fetchCurrentUser,
    handalLogin,
    setIsLogedin,
    handalLogout,
    setShowHeaderFooter,
  };

  // console.log(isLogedin);

  return (
    <Mycontext.Provider value={value}>
      <div className="dark:bg-gray-900 h-full text-white">
        {showHeaderFooter == true && <Header />}
        <Routes>
          <Route exact={true} path="/" element={<Home />} />
          <Route exact={true} path="/auth/login" element={<LoginSignup />} />
          <Route exact={true} path="/video/:id" element={<VideoDisplay />} />
          <Route exact={true} path="/user/setting" element={<Setting />} />
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
        {/* <VideoDisplay /> */}
        {showHeaderFooter == true && <Footer />}
        {/* > */}
      </div>
    </Mycontext.Provider>
  );
}

export default App;
export { Mycontext };
