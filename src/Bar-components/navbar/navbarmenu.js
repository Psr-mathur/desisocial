import React, { useContext } from "react";
import "./navbarmenu.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { BASE_API } from "../../vars";

const Navbarmenu = ({ setopenmenu }) => {
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);
	const queryClient = useQueryClient();
	const mutation = useMutation(
		async () => {
			const res = await axios.get(`${BASE_API}/auth/logout`);
			console.log(res.data);
			return res;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["posts"]);
				setopenmenu(false);
				localStorage.removeItem("user");
				navigate("/login");
			},
		}
	);

	const handleLogout = (e) => {
		e.preventDefault();
		mutation.mutate();
	};

	return (
		<div className="navmenu">
			<ul>
				<li onClick={() => setopenmenu(false)}>
					<Link
						to={`/profile/${currentUser.id}`}
						style={{
							textDecoration: "none",
							color: "inherit",
						}}
					>
						Profile
					</Link>
				</li>
				<li onClick={() => navigate("/relations")}>Friends</li>
				<li onClick={handleLogout}>Logout</li>
				<li>Settings</li>
			</ul>
		</div>
	);
};

export default Navbarmenu;
