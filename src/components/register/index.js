import React, { useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_API } from "../../vars";

const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_API}/auth/register`, inputs);
        } catch (err) {
            setError(err.response.data);
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
                        {error && <span>{error}</span>}
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
