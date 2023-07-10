import React, { useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API } from "../../vars";

const Register = () => {
	const [inputs, setInputs] = useState({
		username: "",
		email: "",
		password: "",
		name: "",
	});
	const [resmsg, setResmsg] = useState(null);

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const navigate = useNavigate();
	const handleClick = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${BASE_API}/auth/register`, inputs);
			// console.log(res.data);
			setResmsg(res.data);
			setTimeout(() => {
				navigate("/login");
			}, 3000);
		} catch (err) {
			// console.log(err.response.data);
			setResmsg(err.response.data);
		}
	};

	// console.log(error);

	return (
		<div className="register">
			<div className="card">
				<div className="left">
					<h1>Hello World</h1>
					<p>
						Veniam esse officia tempor nulla nisi ipsum esse
						consequat adipisicing proident irure laborum proident.
						Nisi labore ad incididunt voluptate sint veniam irure
						elit do sit laboris non pariatur. Nulla proident id
						laborum Lorem elit laborum esse cupidatat non ut cillum
						labore anim.
					</p>
					<span>Already have an account?</span>
					<Link to="/login">
						<button>Login</button>
					</Link>
				</div>
				<div className="right">
					<h1>Register</h1>
					<form>
						<input
							type="text"
							placeholder="Username"
							name="username"
							onChange={handleChange}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
						/>
						<input
							type="text"
							placeholder="Name"
							name="name"
							onChange={handleChange}
						/>
						<span>{resmsg}</span>
						<button onClick={handleClick}>Register</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
