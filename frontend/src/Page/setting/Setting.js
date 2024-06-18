import { Button } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Mycontext } from "../../App";
// import { Link } from "react-router-dom";

const Setting = () => {
  const context = useContext(Mycontext);

  const [passModel, setPassmodel] = useState(false);
  const [avatarModel, setavatarmodel] = useState(false);
  const [coverModel, setcovermodel] = useState(false);
  const [detailModel, setDetailmodel] = useState(false);

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    repeated: "",
  });
  const [details, setDetails] = useState({
    email: "",
    fullname: "",
  });
  const [photo, setPhoto] = useState(null);
  const [cover, setCover] = useState(null);

  const [showPass, setShowPass] = useState(false);
  const handalSubmitPass = async (e) => {
    e.preventDefault();
    // console.log(password.oldPassword, password.newPassword, password.repeated);
    if (password.newPassword != password.repeated) {
      //   console.log(password);
      //   console.log("Same");
      alert("New Password And Reapeted Password Is Not Same");
    } else {
      try {
        let response = await axios.post(
          `${process.env.REACT_APP_SITE}api/v1/users/changePassword`,
          {
            newPassword: password.newPassword,
            oldPassword: password.oldPassword,
          },
          {
            headers: {
              Authorization: context.userToken,
            },
          }
        );
        if (response.data.success == true) {
          console.log(response.data);
          alert("Password Changed Successfully");
          setPassmodel(false);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          alert(error.response.data.message);
        } else {
          console.log(error);
        }
      }
    }
  };

  const handalChnageAvatar = async (e) => {
    e.preventDefault();
    // console.log(photo);
    if (photo == null) {
      console.log("ProfilePhoto IS Required");
      alert("Please Select One Photo !");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", photo);
    try {
      let response = await axios.patch(
        `${process.env.REACT_APP_SITE}api/v1/users/updateuseravatar`,
        formData,
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );
      if (response.data.success == true) {
        console.log(response.data);
        alert("Photo Changed Successfully");
        setavatarmodel(false);
        context.fetchCurrentUser();
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };
  const handalChnageCover = async (e) => {
    e.preventDefault();
    // console.log(photo);
    if (cover == null) {
      console.log("CoverPhoto IS Required");
      alert("Please Select One Photo for CoverPhoto !");
      return;
    }
    const formData = new FormData();
    formData.append("coverImage", cover);
    try {
      let response = await axios.patch(
        `${process.env.REACT_APP_SITE}api/v1/users/updatecoverimage`,
        formData,
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );
      if (response.data.success == true) {
        console.log(response.data);
        alert("CoverImage Updated Successfully");
        setcovermodel(false);
        context.fetchCurrentUser();
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  const handelChnageDetails = async (e) => {
    e.preventDefault();
    if (details.email.length == 0 && details.fullname.length == 0) {
      alert(
        "Please add email and fullname. if you want to remail than write it again"
      );
      return;
    }
    const formData = new FormData();
    formData.append("fullName", details.fullname);
    formData.append(" email", details.email);
    try {
      let response = await axios.patch(
        `${process.env.REACT_APP_SITE}api/v1/users/updateuserdetails`,
        {
          fullName: details.fullname,
          email: details.email,
        },
        {
          headers: {
            Authorization: context.userToken,
          },
        }
      );
      if (response.data.success == true) {
        // console.log(response.data);
        alert("Detals  Updated Successfully");
        setDetailmodel(false);
        context.fetchCurrentUser();
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="container  mx-auto bg-gray-800 rounded-lg p-3">
      <h2>Setting</h2>
      <div className="flex flex-col gap-3 my-2">
        <div>
          <Button
            onClick={() => setPassmodel(true)}
            style={{
              background: "grey",
              textTransform: "none",
              width: "fit-content",
              color: "black",
            }}
          >
            Change Password
          </Button>

          {/* <!-- Main modal --> */}
          <div
            className={`${
              passModel == true ? "block" : "hidden"
            } flex  fixed  top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full`}
          >
            {/* <!--backDrop--!> */}
            <div
              id="authentication-modal"
              tabIndex="-1"
              className="bg-gray-800 opacity-[0.9] fixed w-full md:inset-0 h-full  "
              aria-hidden="true"
            />
            <div className="relative mx-auto p-4 w-full max-w-md max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Change Password
                  </h3>
                  <button
                    type="button"
                    onClick={() => setPassmodel(false)}
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="p-4 md:p-5">
                  <form
                    className="space-y-4"
                    onSubmit={(e) => handalSubmitPass(e)}
                  >
                    <div>
                      <label
                        htmlFor="oldPass"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        old Password
                      </label>
                      <input
                        type="password"
                        name="oldPass"
                        autoComplete="true"
                        id="oldPass"
                        onChange={(e) =>
                          setPassword({
                            ...password,
                            oldPassword: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="newPass"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        new Password
                      </label>
                      <input
                        type="password"
                        name="newPass"
                        autoComplete="true"
                        id="newPass"
                        onChange={(e) =>
                          setPassword({
                            ...password,
                            newPassword: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        confirm password
                      </label>
                      <input
                        type={showPass == true ? "text" : "password"}
                        autoComplete="true"
                        name="password"
                        id="password"
                        onChange={(e) =>
                          setPassword({
                            ...password,
                            repeated: e.target.value,
                          })
                        }
                        placeholder="••••••••"
                        className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      ></input>
                      <div className="my-1">
                        <Button
                          onClick={() => setShowPass(!showPass)}
                          variant="contained"
                          color="primary"
                        >
                          {!showPass ? "show" : "hide"}
                        </Button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Change Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Button
            onClick={() => setavatarmodel(true)}
            style={{
              background: "grey",
              textTransform: "none",
              width: "fit-content",
              color: "black",
            }}
          >
            Change Profile Pic (avatar)
          </Button>
          {/* <!-- Main modal --> */}
          <div
            className={`${
              avatarModel == true ? "block" : "hidden"
            } flex  fixed  top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full`}
          >
            {/* <!--backDrop--!> */}
            <div
              id="authentication-modal"
              tabIndex="-1"
              className="bg-gray-800 opacity-[0.9] fixed w-full md:inset-0 h-full  "
              aria-hidden="true"
            />
            <div className="relative mx-auto p-4 w-full max-w-md max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Change Profile Photo
                  </h3>
                  <button
                    type="button"
                    onClick={() => setavatarmodel(false)}
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="p-4 md:p-5">
                  <img
                    src={context.user?.avatar}
                    className="h-[200px] w-[200px] mx-auto"
                  />
                  <p className="text-center">Current Pic</p>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => handalChnageAvatar(e)}
                  >
                    <div>
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="file_input"
                      >
                        Change Photo
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0])}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Change Photo
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button
            onClick={() => setcovermodel(true)}
            style={{
              background: "grey",
              textTransform: "none",
              width: "fit-content",
              color: "black",
            }}
          >
            Change CoverImage
          </Button>
          {/* <!-- Main modal --> */}
          <div
            className={`${
              coverModel == true ? "block" : "hidden"
            } flex  fixed  top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full`}
          >
            {/* <!--backDrop--!> */}
            <div
              id="authentication-modal"
              tabIndex="-1"
              className="bg-gray-800 opacity-[0.9] fixed w-full md:inset-0 h-full  "
              aria-hidden="true"
              onClick={() => setcovermodel(false)}
            />
            <div className="relative mx-auto p-4 w-full max-w-md max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Change Cover Photo
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setcovermodel(false);
                    }}
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="p-4 md:p-5">
                  {context.user?.coverImage !== "" ? (
                    <>
                      <img
                        src={context.user?.coverImage}
                        className=" aspect-video mx-auto"
                      />
                      <p className="text-center">Current Pic</p>
                    </>
                  ) : (
                    <h3>Not Added CoverImage add one To see </h3>
                  )}
                  <form
                    className="space-y-4"
                    onSubmit={(e) => handalChnageCover(e)}
                  >
                    <div>
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="file_input"
                      >
                        Change Photo
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                        onChange={(e) => setCover(e.target.files[0])}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Change Cover Photo
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button
            onClick={() => setDetailmodel(true)}
            style={{
              background: "grey",
              textTransform: "none",
              width: "fit-content",
              color: "black",
            }}
          >
            Change Details
          </Button>
          {/* <!-- Main modal --> */}
          <div
            className={`${
              detailModel == true ? "block" : "hidden"
            } flex  fixed  top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full`}
          >
            {/* <!--backDrop--!> */}
            <div
              id="authentication-modal"
              tabIndex="-1"
              className="bg-gray-800 opacity-[0.9] fixed w-full md:inset-0 h-full  "
              aria-hidden="true"
            />
            <div className="relative mx-auto p-4 w-full max-w-md max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Change Details
                  </h3>
                  <button
                    onClick={() => setDetailmodel(false)}
                    className="end-2.5  text-gray-400 bg-transparent hover:bg-gray-900 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    //   data-modal-hide="authentication-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="p-4 md:p-5">
                  <form
                    className="space-y-4"
                    onSubmit={(e) => handelChnageDetails(e)}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        autoComplete="true"
                        id="email"
                        onChange={(e) =>
                          setDetails({
                            ...details,
                            email: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="enter new Email"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Fullname
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        autoComplete="true"
                        id="fullName"
                        onChange={(e) =>
                          setDetails({
                            ...details,
                            fullname: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Change Details
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
