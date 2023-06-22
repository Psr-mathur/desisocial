import React, { useContext, useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate("/");
        } catch (err) {
            setError(err.response);
        }
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
                    <h1>Login</h1>
                    <form>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                        />
                        {error && <span>{error.data}</span>}
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
