import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AddIcon from "@mui/icons-material/Add";
import BoyIcon from "@mui/icons-material/Boy";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StoreIcon from '@mui/icons-material/Store';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SubjectIcon from '@mui/icons-material/Subject';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
import { setRef } from "@mui/material";
import { decrypt } from "../../redux/encryption";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";
const isActiveStyle =
  "flex items-center px-5 gap-3 text-blue-600 transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";

const Sidebar = () => {
  const [user, setUser] = useState(JSON.parse(decrypt(localStorage.getItem("user"))));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notices = useSelector((state) => state.admin.notices.result);
  const logout = () => {
    alert("OOPS! Your session expired. Please Login again");
    dispatch({ type: "LOGOUT" });
    navigate("/login/admin");
  };

  const logoutClick = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/login/admin");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("admin")));
  }, [navigate]);
  // useEffect(() => {
  //   if (rf === "home") {
  //     elRef[0].current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "end",
  //       inline: "nearest",
  //     });
  //   }
  // }, []);
  return (
    <>
      <div className="flex-[0.2] mobile:hidden tablet:hidden">
        <div className="space-y-8 overflow-y-scroll scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-300 h-[33rem]">
          <div className="">
            <NavLink
              to="/admin/home"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <HomeIcon className="" />
              <h1 className="font-normal">Dashboard</h1>
            </NavLink>
            <NavLink
              to="/admin/profile"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <AssignmentIndIcon className="" />
              <h1 className="font-normal">Profile</h1>
            </NavLink>
          </div>
          <div className="">
            <NavLink
              to="/admin/createNotice"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <AddIcon className="" />
              <h1 className="font-normal">Create Notice</h1>
            </NavLink>
          </div>
          <div className="">
            <NavLink
              to="/admin/alladmin"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <EngineeringIcon className="" />
              <h1 className="font-normal">Our Admin</h1>
            </NavLink>
            <NavLink
              to="/admin/addadmin"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <AddIcon className="" />
              <h1 className="font-normal">Add Admin</h1>
            </NavLink>
            <NavLink
              to="/admin/deleteadmin"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <DeleteIcon className="" />
              <h1 className="font-normal">Delete Admin</h1>
            </NavLink>
          </div>
          <div className="">
            <NavLink
              to="/admin/adddepartment"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <AddIcon className="" />
              <h1 className="font-normal">Add Department</h1>
            </NavLink>
            <NavLink
              to="/admin/deletedepartment"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <DeleteIcon className="" />
              <h1 className="font-normal">Delete Department</h1>
            </NavLink>
          </div>
          <div className="">
            <NavLink
              to="/admin/allfaculty"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <EngineeringIcon className="" />
              <h1 className="font-normal">Our Faculty</h1>
            </NavLink>

            <NavLink
              to="/admin/addfaculty"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <AddIcon className="" />
              <h1 className="font-normal">Add Faculty</h1>
            </NavLink>
            <NavLink
              to="/admin/deletefaculty"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <DeleteIcon className="" />
              <h1 className="font-normal">Delete Faculty</h1>
            </NavLink>
          </div>
          <div className="">
            <NavLink
              to="/admin/allstudent"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <BoyIcon className="" />
              <h1 className="font-normal">Our Students</h1>
            </NavLink>

            <NavLink
              to="/admin/addstudent"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <AddIcon className="" />
              <h1 className="font-normal">Add Students</h1>
            </NavLink>
            <NavLink
              to="/admin/deletestudent"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <DeleteIcon className="" />
              <h1 className="font-normal">Delete Student</h1>
            </NavLink>
          </div>
          <div className="">
            <NavLink
              to="/admin/allsubject"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <MenuBookIcon className="" />
              <h1 className="font-normal">Subjects</h1>
            </NavLink>

            <NavLink
              to="/admin/addsubject"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <AddIcon className="" />
              <h1 className="font-normal">Add Subject</h1>
            </NavLink>
            <NavLink
              to="/admin/deletesubject"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <DeleteIcon className="" />
              <h1 className="font-normal">Delete Subject</h1>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="laptop:hidden 2xl:hidden">
        <div id="drawer-navigation" className="fixed z-40 h-screen w-80 overflow-y-auto bg-white p-4 dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-navigation-label">
          <a href="/" className="flex items-center pl-2.5 mb-5">
            <img src="https://cdn.mrayush.me/image/akashic/favicon.ico" className="mr-3 h-6 sm:h-7" alt="Akashic Logo" />
            <span style={{fontSize: "inherit"}} className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Akashic Institute of Technology</span>
          </a>
          <button type="button" data-drawer-dismiss="drawer-navigation" aria-controls="drawer-navigation" className="absolute top-2.5 right-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
            <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Close menu</span>
          </button>
          <div className="overflow-y-auto py-4">
            <ul className="space-y-2">
              <li>
                <a
                  href="/admin/home"
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
                    <a href="/admin/profile" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">View</a>
                  </li>
                  <li>
                    <a href="/admin/update" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Update Profile</a>
                  </li>
                  <li>
                    <a href="/admin/update/password" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Update Password</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/admin/createNotice" className="flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                  <AddIcon className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3 flex-1 whitespace-nowrap">Create Notice</span>
                  <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">{notices?.length || 0}</span>
                </a>
              </li>
              <li>
                <button type="button" className="group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-admin" data-collapse-toggle="dropdown-admin">
                  <EngineeringIcon className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3 flex-1 whitespace-nowrap text-left">Admins</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
                <ul id="dropdown-admin" className="hidden space-y-2 py-2">
                  <li>
                    <a href="/admin/alladmin" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">All Admins</a>
                  </li>
                  <li>
                    <a href="/admin/addadmin" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Admin</a>
                  </li>
                  <li>
                    <a href="/admin/deleteadmin" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Delete Admin</a>
                  </li>
                </ul>
              </li>
              <li>
                <button type="button" className="group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-department" data-collapse-toggle="dropdown-department">
                  <StoreIcon className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3 flex-1 whitespace-nowrap text-left">Departments</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
                <ul id="dropdown-department" className="hidden space-y-2 py-2">
                  <li>
                    <a href="/admin/adddepartment" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Department</a>
                  </li>
                  <li>
                    <a href="/admin/deletedepartment" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Delete Department</a>
                  </li>
                </ul>
              </li>
              <li>
                <button type="button" className="group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-faculty" data-collapse-toggle="dropdown-faculty">
                  <LibraryBooksIcon className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3 flex-1 whitespace-nowrap text-left">Faculty</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
                <ul id="dropdown-faculty" className="hidden space-y-2 py-2">
                  <li>
                    <a href="/admin/allfaculty" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">All Faculty</a>
                  </li>
                  <li>
                    <a href="/admin/addfaculty" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Faculty</a>
                  </li>
                  <li>
                    <a href="/admin/deletefaculty" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Delete Faculty</a>
                  </li>
                </ul>
              </li>
              <li>
                <button type="button" className="group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-student" data-collapse-toggle="dropdown-student">
                  <BoyIcon className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3 flex-1 whitespace-nowrap text-left">Students</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
                <ul id="dropdown-student" className="hidden space-y-2 py-2">
                  <li>
                    <a href="/admin/allstudent" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">All Students</a>
                  </li>
                  <li>
                    <a href="/admin/addstudent" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Student</a>
                  </li>
                  <li>
                    <a href="/admin/deletestudent" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Delete Student</a>
                  </li>
                </ul>
              </li>
              <li>
                <button type="button" className="group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-subject" data-collapse-toggle="dropdown-subject">
                  <SubjectIcon className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  <span className="ml-3 flex-1 whitespace-nowrap text-left">Subjects</span>
                  <svg className="h-6 w-6" fill="cursubjectrentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
                <ul id="dropdown-subject" className="hidden space-y-2 py-2">
                  <li>
                    <a href="/admin/allsubject" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">All Subjects</a>
                  </li>
                  <li>
                    <a href="/admin/addsubject" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Subject</a>
                  </li>
                  <li>
                    <a href="/admin/deletesubject" className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Delete Subject</a>
                  </li>
                </ul>
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
