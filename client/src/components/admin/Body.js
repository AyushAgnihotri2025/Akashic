import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Calendar from "react-calendar";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "react-calendar/dist/Calendar.css";
import { useDispatch , useSelector } from "react-redux";
import Notice from "../notices/Notice";
import ShowNotice from "../notices/ShowNotice";
import ReplyIcon from "@mui/icons-material/Reply";
import { deleteNotice } from "../../redux/actions/adminActions";
import { confirmAlert } from 'react-confirm-alert';
import '../../assets/stylesheets/confirmation-box.scss';

const Body = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openNotice, setOpenNotice] = useState({});
  const [toDeleteNotice, settoDeleteNotice] = useState({});
  const notices = useSelector((state) => state.admin.notices.result);
  const [value, onChange] = useState(new Date());
  const students = useSelector((state) => state.admin.allStudent);
  const faculties = useSelector((state) => state.admin.allFaculty);
  const admins = useSelector((state) => state.admin.allAdmin);
  const departments = useSelector((state) => state.admin.allDepartment);

  function confirmDeleteNotice() {
    confirmAlert({
      title: 'Delete Notice',
      message: 'Are you sure to delete the notice ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(deleteNotice(toDeleteNotice))
        },
        {
          label: 'No',
          onClick: () => null
        },
      ]
    });
  };

  return (
    <div className="flex-[0.8] mt-3 tablet:custom-added-8 mobile:custom-added-8 mobile:flex-[1] tablet:flex-[1] tablet:custom-added-8">
      <div className="space-y-5 mobile:custom-added-7 tablet:custom-added-7">
        <div className="flex text-gray-400 items-center space-x-2 mobile:ml-5 mobile:ml-5">
          <HomeIcon />
          <h1>Dashboard</h1>
        </div>
        <div className="flex flex-col mr-5 space-y-4 overflow-y-hidden">
          <div className="bg-white h-[8rem] rounded-xl shadow-lg grid grid-cols-4 justify-between px-8 items-center space-x-4 mobile:px-1 mobile:space-x-0 mobile:custom-added-4">
            <div className="flex items-center space-x-4 border-r-2 mobile:space-x-0 mobile:custom-added-2">
              <EngineeringIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 35 }}
              />
              <div className="flex flex-col">
                <h1>Faculty</h1>
                <h2 className="text-2xl font-bold">{faculties?.length}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2 mobile:space-x-0 mobile:custom-added-2">
              <BoyIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 35 }}
              />
              <div className="flex flex-col">
                <h1>Student</h1>
                <h2 className="text-2xl font-bold">{students?.length}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-r-2 mobile:space-x-0 mobile:custom-added-2">
              <SupervisorAccountIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 35 }}
              />
              <div className="flex flex-col">
                <h1>Admin</h1>
                <h2 className="text-2xl font-bold">{admins?.length}</h2>
              </div>
            </div>
            <div className="flex items-center space-x-4 mobile:space-x-0 mobile:custom-added-2">
              <MenuBookIcon
                className="rounded-full py-2 bg-orange-300"
                sx={{ fontSize: 35 }}
              />
              <div className="flex flex-col">
                <h1>Department</h1>
                <h2 className="text-2xl font-bold">{departments?.length}</h2>
              </div>
            </div>
          </div>
          <div className="flex space-x-4 mobile:custom-added-1">
            <div className="flex flex-col mobile:flex-none space-y-4 w-2/6 mobile:custom-added-4 mobile:w-[95%] mobile:custom-added-5">
              <div className="bg-white h-[17rem] rounded-xl shadow-lg">
                <Calendar onChange={onChange} value={value} />
              </div>
            </div>
            <div className="bg-white h-[17rem] w-full rounded-xl shadow-lg flex flex-col pt-3 mobile:flex-none mobile:w-[95%]">
              <div className="flex px-3">
                {open && (
                  <ReplyIcon
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                  />
                )}
                <h1 className="font-bold text-xl w-full text-center">
                  Notices
                </h1>
                {open && (
                  <DeleteForeverIcon
                    onClick={() => confirmDeleteNotice()}
                    className="cursor-pointer"
                  />
                )}
              </div>
              <div className="mx-5 mt-5 space-y-3 overflow-y-auto h-[12rem]">
                {!open ? (
                  notices?.map((notice, idx) => (
                    <div
                      onClick={() => {
                        setOpen(true);
                        setOpenNotice(notice);
                        settoDeleteNotice(notice);
                      }}
                      className="">
                      <Notice idx={idx} notice={notice} notFor="" />
                    </div>
                  ))
                ) : (
                  <ShowNotice notice={openNotice} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
