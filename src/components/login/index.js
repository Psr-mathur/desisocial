import React, { useContext, useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import ButLoading from "../../butLoading";

const Login = () => {
	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});
	const [error, setError] = useState(null);
	const [ls, setLs] = useState(false);

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const { login } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setLs(true);
		try {
			await login(inputs);
			navigate("/");
		} catch (err) {
			setError(err.response);
		}
		setLs(false);
	};
	// console.log(error);
	return (
		<div className="login">
			<div className="card">
				<div className="left">
					<h1>Desi Social</h1>
					<p>
						Veniam esse officia tempor nulla nisi ipsum esse
						consequat adipisicing proident irure laborum proident.
						Nisi labore ad incididunt voluptate sint veniam irure
						elit do sit laboris non pariatur. Nulla proident id
						laborum Lorem elit laborum esse cupidatat non ut cillum
						labore anim.
					</p>
					<span>Don't have an account?</span>
					<Link to="/register">
						<button>Register</button>
					</Link>
				</div>
				<div className="right">
					<div>
						<p>testid : tester</p>
						<p>password : 12345</p>
					</div>
					<h1>Login</h1>
					<form onSubmit={handleLogin}>
						<input
							type="text"
							placeholder="Username"
							name="username"
							onChange={handleChange}
							required
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							required
						/>
						{error && (
							<span style={{ color: "#f25c6b" }}>
								{error.data}
							</span>
						)}
						<button type="submit" disabled={ls}>
							{ls ? <ButLoading /> : "Login"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
