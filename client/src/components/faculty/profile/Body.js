import React, { useEffect, useState } from "react";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SecurityUpdateIcon from "@mui/icons-material/SecurityUpdate";
import { Avatar } from "@mui/material";
import Data from "./Data";
import { useNavigate } from "react-router-dom";
import { decrypt } from "../../../redux/encryption";

const Body = () => {
    const [avatar, setAvatar] = useState("");
    const user = JSON.parse(decrypt(localStorage.getItem("user")));
    const navigate = useNavigate();

    useEffect(() => {
        fetch(user.result.avatar)
            .then(res => res.blob())
            .then((res) => {
                setAvatar(URL.createObjectURL(res));
            });
    }, []);

    useEffect(() => {
        setTimeout(function () { URL.revokeObjectURL(avatar) }, 9546)
    }, [avatar]);

    return (
        <div className="flex-[0.8] mt-3 tablet:custom-added-8 mobile:custom-added-8 mobile:flex-[1] tablet:flex-[1] tablet:custom-added-8">
            <div className="space-y-5 mobile:custom-added-7 tablet:custom-added-7">
                <div className="flex  items-center justify-between mr-8">
                    <div className="flex space-x-2 text-gray-400">
                        <AssignmentIndIcon />
                        <h1>Profile</h1>
                    </div>
                    <div
                        onClick={() => navigate("/faculty/update")}
                        className="flex space-x-2 cursor-pointer">
                        <SecurityUpdateIcon />
                        <h1 className="font-bold">Update</h1>
                    </div>
                </div>
                <div className="w-[98%] bg-white relative rounded-xl ">
                    <div className="absolute left-[50%] top-[-10%]">
                        <Avatar src={avatar} sx={{ width: 70, height: 70 }} />
                    </div>
                    <div className="flex py-10 ml-10 space-x-40 mobile:custom-added-2">
                        <div className="flex flex-col space-y-10">
                            <Data label="Name" value={user.result.name} />
                            <Data label="Email" value={user.result.email} />
                            <Data label="Username" value={user.result.username} />
                            <Data label="Department" value={user.result.department} />
                        </div>
                        <div className="flex flex-col space-y-10 ">
                            <Data label="DOB" value={user.result.dob} />
                            <Data label="Joining Year" value={user.result.joiningYear} />
                            <Data label="Contact Number" value={user.result.contactNumber} />
                            <Data label="Designation" value={user.result.designation} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Body;
