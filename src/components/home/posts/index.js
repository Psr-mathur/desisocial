import React from "react";
import "./index.scss";
import { useQuery } from "@tanstack/react-query";
import Post from "./Post";
import makeReaquest from "../makerequest";
import Loading from "../../../loading";

const Posts = ({ CPuserid }) => {
    // console.log("posts rendering", Date());
    const { isLoading, error, data } = useQuery(["posts"], async () => {
        const res = await makeReaquest.get("/posts?cpuserid=" + CPuserid);
        return res.data;
    });

    // console.log(data);
    return (
        <div className="posts">
            {error ? (
                "Something went wrong!" + error + ":       Login Again."
            ) : isLoading ? (
                <div className="container">
                    <Loading />
                </div>
            ) : (
                data.map((post) => <Post post={post} key={post.id} />)
            )}
        </div>
    );
};

export default Posts;
