import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EngineeringIcon from "@mui/icons-material/Engineering";
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { decrypt } from "../../redux/encryption";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";
const isActiveStyle =
  "flex items-center px-5 gap-3 text-blue-600 transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";

const Sidebar = () => {
  const [user, setUser] = useState(JSON.parse(decrypt(localStorage.getItem("user"))));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    alert("OOPS! Your session expired. Please Login again");
    dispatch({ type: "LOGOUT" });
    navigate("/login/faculty");
  };
  const logoutClick = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/login/faculty");
  };
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("faculty")));
  }, [navigate]);
  return (
    <>
      <div className="flex-[0.2] mobile:hidden tablet:hidden">
        <div className="space-y-8 overflow-y-scroll scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-300 h-[33rem]">
          <div className="">
            <NavLink
              to="/faculty/home"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <HomeIcon className="" />
              <h1 className="font-normal">Dashboard</h1>
            </NavLink>
            <NavLink
              to="/faculty/profile"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <AssignmentIndIcon className="" />
              <h1 className="font-normal">Profile</h1>
            </NavLink>
          </div>
          <div className="">
            <NavLink
              to="/faculty/createtest"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <AddIcon className="" />
              <h1 className="font-normal">Create Test</h1>
            </NavLink>
            <NavLink
              to="/faculty/uploadmarks"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <AddIcon className="" />
              <h1 className="font-normal">Upload Marks</h1>
            </NavLink>
          </div>
          <div className="">
            <NavLink
              to="/faculty/markattendance"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <EngineeringIcon className="" />
              <h1 className="font-normal">Mark Attendance</h1>
            </NavLink>
          </div>
        </div>
      </div>

      <div className="laptop:hidden 2xl:hidden">
        <div id="drawer-navigation" className="fixed z-40 h-screen w-80 overflow-y-auto bg-white p-4 dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-navigation-label">
          <a href="/" className="flex items-center pl-2.5 mb-5">
            <img src="https://cdn.mrayush.me/image/akashic/favicon.ico" className="mr-3 h-6 sm:h-7" alt="Akashic Logo" />
            <span style={{ fontSize: "inherit" }} className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Akashic Institute of Technology</span>
          </a>
          <button type="button" data-drawer-dismiss="drawer-navigation" aria-controls="drawer-navigation" className="absolute top-2.5 right-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
            <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Close menu</span>
          </button>
          <div className="overflow-y-auto py-4">
            <ul className="space-y-2">
              <li>
                <a
                  href="/faculty/home"
                  className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                  <HomeIcon className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3">Dashboard</span>
                </a>
              </li>
              <li>
                <button type="button" className="group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-profile" data-collapse-toggle="dropdown-profile">
                  <AssignmentIndIcon className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3 flex-1 whitespace-nowrap text-left">Profile</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
                <ul id="dropdown-profile" className="hidden space-y-2 py-2">
                  <li>
                    <a href="/faculty/profile" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">View</a>
                  </li>
                  <li>
                    <a href="/faculty/update" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Update Profile</a>
                  </li>
                  <li>
                    <a href="/faculty/update/password" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Update Password</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/faculty/createtest" className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                  <AddIcon className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3 flex-1 whitespace-nowrap">Create Test</span>
                </a>
              </li>
              <li>
                <a href="/faculty/uploadmarks" className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                  <AddIcon className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3 flex-1 whitespace-nowrap">Upload Marks</span>
                </a>
              </li>
              <li>
                <a href="/faculty/markattendance" className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                  <EngineeringIcon className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3 flex-1 whitespace-nowrap">Mark Attendance</span>
                </a>
              </li>
              <li>
                <a href='#' onClick={logoutClick} className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                  <LogoutIcon className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3 flex-1 whitespace-nowrap">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
