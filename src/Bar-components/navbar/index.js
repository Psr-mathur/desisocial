import React, { useContext, useState } from "react";
import "./index.scss";
import {
    HomeOutlined,
    DarkModeOutlined,
    // WbSunnyOutlined,
    GridViewOutlined,
    NotificationsOutlined,
    EmailOutlined,
    PersonOutlined,
    SearchOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Navbarmenu from "./navbarmenu";

// const IMAGE_URL =
// "https://images.pexels.com/photos/16377849/pexels-photo-16377849/free-photo-of-man-wearing-red-jacket-looking-at-mountains.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    const [openmenu, setopenmenu] = useState(false);
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
                <div
                    className="user"
                    onClick={() => setopenmenu((prev) => !prev)}
                >
                    <img src={currentUser.profilepic} alt="" />
                    <span>{currentUser.name}</span>
                </div>
                {openmenu && <Navbarmenu setopenmenu={setopenmenu} />}
            </div>
        </div>
    );
};

export default Navbar;
