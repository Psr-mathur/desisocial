import React from "react";
import "./Postmenu.scss";
import makeReaquest from "../makerequest.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Postmenu = ({ currentUserid, postid, postUserid }) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (postid) => {
            return makeReaquest.delete("/posts", { data: { postid: postid } });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"]);
            },
        }
    );

    const handleDelete = (e) => {
        e.preventDefault();
        console.log("clicked");
        mutation.mutate(postid);
    };

    return (
        <div className="postmenu">
            <ul>
                {currentUserid === postUserid && (
                    <li onClick={handleDelete}>Delete</li>
                )}
                <li>Info</li>
            </ul>
        </div>
    );
};

export default Postmenu;
