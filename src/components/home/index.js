import React from "react";
import "./index.scss";
import Stories from "./stories";
import Posts from "./posts";
import Addpost from "./addpost";

const Home = () => {
    return (
        <div className="home">
            <Stories />
            <Addpost />
            <Posts />
        </div>
    );
};

export default Home;
