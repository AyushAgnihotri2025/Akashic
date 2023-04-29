import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  getAllStudent,
  getAllFaculty,
  getAllAdmin,
  getAllDepartment,
  getNotice,
} from "../../redux/actions/adminActions";
import Body from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {decrypt} from "../../redux/encryption";

const AdminHome = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStudent());
    dispatch(getAllFaculty());
    dispatch(getAllAdmin());
    dispatch(getAllDepartment());
    dispatch(getNotice());
  }, [dispatch]);

  const LoginedUser = JSON.parse(decrypt(localStorage.getItem("user")));
  if (LoginedUser.result.position === "Admin") {
      return (
        <div className="bg-[#d6d9e0] h-screen mobile:h-full tablet:h-full flex items-center justify-center">
          <div className="flex flex-col  bg-[#f4f6fa] h-5/6 w-[95%] rounded-2xl shadow-2xl space-y-6 overflow-y-hidden mobile:h-full tablet:h-full">
            <Header />
            <div className="flex flex-[0.95]">
              <Sidebar />
              <Body />
            </div>
          </div>
        </div>
      );
  } else {
      return (<Navigate to={`/${LoginedUser.result.position.toLowerCase()}/home`} replace={true}/>);
  };
};

export default AdminHome;
