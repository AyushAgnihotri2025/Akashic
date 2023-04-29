import React, { useEffect } from "react";
import "../../../assets/stylesheets/table.scss";
import { useDispatch } from "react-redux";
import { getSubject } from "../../../redux/actions/studentActions";
import {decrypt} from "../../../redux/encryption";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Body from "./Body";
import { Navigate } from "react-router-dom";

const SubjectList = () => {
  const user = JSON.parse(decrypt(localStorage.getItem("user")));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubject(user.result.department, user.result.year));
  }, [dispatch]);
if (user.result.position === "Student") {
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
      return (<Navigate to={`/${user.result.position.toLowerCase()}/home`} replace={true}/>);
    };
};

export default SubjectList;
