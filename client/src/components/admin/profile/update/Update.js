import React, { useEffect } from "react";
import Body from "./Body";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { useDispatch } from "react-redux";
import { getAllDepartment } from "../../../../redux/actions/adminActions";
import { Navigate } from "react-router-dom";
import {decrypt} from "../../../../redux/encryption";

const Update = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDepartment());
  }, [dispatch]);
  const LoginedUser = JSON.parse(decrypt(localStorage.getItem("user")));
  if (LoginedUser.result.position === "Admin") {
      return (
        <div className="bg-[#d6d9e0] h-screen mobile:h-full tablet:h-full flex items-center justify-center">
          <div className="flex flex-col  bg-[#f4f6fa] h-5/6 w-[95%] rounded-2xl shadow-2xl space-y-6 ">
            <Header />
            <div className="flex flex-[0.95]">
              <Sidebar />
              <Body />
            </div>
          </div>
        </div>
      );
  } else {
      return (<Navigate to={`/${LoginedUser.result.position.toLowerCase()}/update`} replace={true}/>);
  };
};

export default Update;
