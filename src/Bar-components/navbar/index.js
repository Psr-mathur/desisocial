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
	GroupAddOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Navbarmenu from "./navbarmenu";

// const IMAGE_URL =
// "https://images.pexels.com/photos/16377849/pexels-photo-16377849/free-photo-of-man-wearing-red-jacket-looking-at-mountains.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const Navbar = () => {
	const { currentUser } = useContext(AuthContext);
	const [openmenu, setopenmenu] = useState(false);
	const navigate = useNavigate();
	const handleSuggestion = () => {
		navigate("/suggestions");
	};
	// console.log(window.innerWidth);
	// console.log(screen.width);
	return (
		<div className="navbar">
			<div className="left">
				<Link to="/" style={{ textDecoration: "none" }}>
					<span>Desi Social</span>
				</Link>
				<HomeOutlined />
				<DarkModeOutlined />
				{window.innerWidth < 460 ? (
					<GroupAddOutlined onClick={handleSuggestion} />
				) : (
					<GridViewOutlined />
				)}
				<div className="search">
					<SearchOutlined />
					<input type="text" placeholder="Search" />
				</div>
			</div>
			<div className="right">
				<PersonOutlined className="logo" />
				<EmailOutlined className="logo" />
				<NotificationsOutlined className="logo" />
				<div
					className="user"
					onClick={() => setopenmenu((prev) => !prev)}
				>
					<img src={currentUser.profilepic} alt="" />
					<span>{currentUser.name}</span>
				</div>
				{/* {openmenu && <Navbarmenu setopenmenu={setopenmenu} />} */}
				<Navbarmenu isopen={openmenu} setopenmenu={setopenmenu} />
			</div>
		</div>
	);
};

export default Navbar;
