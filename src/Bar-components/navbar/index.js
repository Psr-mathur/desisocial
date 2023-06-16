import React, { useContext } from "react";
import "./index.scss";
import {
    HomeOutlined,
    DarkModeOutlined,
    WbSunnyOutlined,
    GridViewOutlined,
    NotificationsOutlined,
    EmailOutlined,
    PersonOutlined,
    SearchOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const IMAGE_URL =
    "https://images.pexels.com/photos/16377849/pexels-photo-16377849/free-photo-of-man-wearing-red-jacket-looking-at-mountains.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span>Desi Social</span>
                </Link>
                <HomeOutlined />
                <DarkModeOutlined />
                <GridViewOutlined />
                <div className="search">
                    <SearchOutlined />
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div className="right">
                <PersonOutlined />
                <EmailOutlined />
                <NotificationsOutlined />
                <div className="user">
                    <img src={currentUser.profilepic} alt="" />
                    <span>{currentUser.name}</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
