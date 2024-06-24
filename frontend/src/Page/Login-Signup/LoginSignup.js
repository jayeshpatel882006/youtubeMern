import React, { useContext, useEffect, useState } from "react";
import "./loginSignup.css";
import OndemandVideo from "@mui/icons-material/OndemandVideo";
import { Button } from "@mui/base";
import axios from "axios";
import { Mycontext } from "../../App";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const context = useContext(Mycontext);
  const navigate = useNavigate();
  const [screen, setScreen] = useState("login");
  const [field, setfield] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    avatar: null,
  });

  useEffect(() => {
    context.setShowHeaderFooter(false);
  }, []);

  //   let res;
  const handalSignup = async (e) => {
    e.preventDefault();
    console.log(field);
    const formData = new FormData();
    formData.append("username", field.username);
    formData.append("fullName", field.fullname);
    formData.append("email", field.email);
    formData.append("password", field.password);
    formData.append("avatar", field.avatar);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SITE}api/v1/users/register`,
        // email: field.email,
        // password: field.password,
        // fullName: field.fullname,
        // username: field.username,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //   if (res) {

      //   }
      if (res.data.success == true) {
        // context.setIsLogedin(true);
        // navigate("/");
        setScreen("login");
      }

      //   console.log(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data);
    //   });
    // res =  fetch("http://localhost:7000/api/v1/users/register");
  };

  const handalLogin = async (e) => {
    e.preventDefault();
    // console.log(process.env.REACT_APP_SITE);
    if (field.username.length == 0 && field.email.length == 0) {
      return console.log("username or email is needed");
    }
    
    try {
      context.setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_SITE}api/v1/users/login`,
        {
          email: field.email,
          password: field.password,
          username: field.username,
        }
      );
      console.log(res.data);
      if (res.data.success == true) {
        // console.log(res.data.data);
        context.handalLogin(res.data.data);
        navigate("/");
        context.setLoading(false);
      }
    } catch (err) {
      console.log(err.response.data);
      // context.setLoading(false);
    }
  };
  return (
    <>
      {screen == "login" && (
        <div className="flex h-screen min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex items-center justify-center gap-4">
              <OndemandVideo className="text-7xl  h-14 w-auto" /> PatelTube
            </div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
              Login in to your account
            </h2>
          </div>

          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handalLogin}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 "
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="true"
                    onChange={(e) =>
                      setfield({ ...field, username: e.target.value })
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center ">OR</div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 "
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="true"
                    onChange={(e) =>
                      setfield({ ...field, email: e.target.value })
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 "
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) =>
                      setfield({ ...field, password: e.target.value })
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account?
              <Button
                onClick={() => setScreen("signup")}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                signup
              </Button>
            </p>
          </div>
        </div>
      )}
      {screen == "signup" && (
        <div className="flex h-screen min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex items-center justify-center gap-4">
              <OndemandVideo className="text-7xl  h-14 w-auto" /> PatelTube
            </div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
              signup
            </h2>
          </div>

          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={(e) => handalSignup(e)}>
              {/* username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 "
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="true"
                    onChange={(e) =>
                      setfield({ ...field, username: e.target.value })
                    }
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* fullname */}
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium leading-6 "
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    onChange={(e) =>
                      setfield({ ...field, fullname: e.target.value })
                    }
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* email  */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 "
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={(e) =>
                      setfield({ ...field, email: e.target.value })
                    }
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* password */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 "
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) =>
                      setfield({ ...field, password: e.target.value })
                    }
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* avatar */}
              <div>
                <div className="flex items-center flex-col justify-between">
                  <div className="w-full">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="file_input"
                    >
                      Upload file
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      aria-describedby="file_input_help"
                      id="file_input"
                      type="file"
                      onChange={(e) =>
                        setfield({ ...field, avatar: e.target.files[0] })
                      }
                    />
                  </div>
                  <div>
                    <p
                      className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                      id="file_input_help"
                    >
                      SVG, PNG, JPG or GIF (MAX. 800x400px).
                    </p>
                  </div>
                </div>
              </div>
              {/* submitbutton */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              have an account?
              <Button
                onClick={() => setScreen("login")}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignup;
