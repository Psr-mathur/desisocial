import React from "react";
import "./index.scss";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Post from "./Post";
import makeReaquest from "../makerequest";

const Posts = ({ CPuserid }) => {
    const { isLoading, error, data } = useQuery(["posts"], () =>
        makeReaquest.get("/posts?cpuserid=" + CPuserid).then((res) => res.data)
    );

    // console.log(data);
    return (
        <div className="posts">
            {error
                ? "Something went wrong!" + error
                : isLoading
                ? "Loading..."
                : data.map((post) => <Post post={post} key={post.id} />)}
        </div>
    );
};

export default Posts;
