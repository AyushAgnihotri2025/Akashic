import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decrypt } from "../../redux/encryption";

const Header = () => {
    const [avatar, setAvatar] = useState("");

    const user = JSON.parse(decrypt(localStorage.getItem("user")));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/login/admin");
    };

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
        <div className="flex-[0.05] flex justify-between items-center mx-5 my-2">
            <div className="flex items-center ">
                <img
                    draggable="false"
                    src="https://cdn.mrayush.me/akashic/erp-icon.jpg"
                    alt=""
                    className="h-7 mobile:hidden tablet:hidden"
                />
                <img
                    draggable="false"
                    src="https://cdn.mrayush.me/akashic/erp-icon.jpg"
                    alt=""
                    data-drawer-target="drawer-navigation"
                    data-drawer-show="drawer-navigation"
                    aria-controls="drawer-navigation"
                    className="h-7 laptop:hidden 2xl:hidden"
                />
                <h1 className="font-bold text-blue-600 text-sm">ERP</h1>
            </div>
            <h1 className="font-semibold text-black">Welcome</h1>
            <div className="flex items-center space-x-3">
                <Avatar
                    src={avatar}
                    alt={user.result.name.charAt(0)}
                    sx={{ width: 24, height: 24 }}
                    className="border-blue-600 border-2"
                />
                <h1>{user.result.name.split(" ")[0]}</h1>
                <LogoutIcon
                    onClick={logout}
                    className="cursor-pointer hover:scale-125 transition-all "
                />
            </div>
        </div>
    );
};

export default Header;