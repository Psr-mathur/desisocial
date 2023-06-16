import React, { useContext, useState } from "react";
import "./index.scss";
import Posts from "../home/posts";

import {
    FacebookTwoTone,
    LinkedIn,
    Instagram,
    Pinterest,
    Twitter,
    Place,
    Language,
    EmailOutlined,
    MoreVert,
} from "@mui/icons-material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeReaquest from "../home/makerequest";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Update from "../update";

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const CPuserid = useLocation().pathname.split("/")[2];

    const { isLoading, error, data } = useQuery(["user"], () => {
        return makeReaquest
            .get("/users/find/" + CPuserid)
            .then((res) => res.data);
    });

    const {
        isLoading: RisLoading,
        error: Rerror,
        data: RelData,
    } = useQuery(["relationship"], () => {
        return makeReaquest
            .get("/relationships?followeduserid=" + CPuserid)
            .then((res) => res.data);
    });
    // console.log(RelData);
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (follower) => {
            if (!follower)
                return makeReaquest.post("/relationships", {
                    userid: CPuserid,
                });
            return makeReaquest.delete(
                "/relationships?followeruserid=" + currentUser.id
            );
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["relationship"]);
                // setDesc("");
            },
        }
    );
    const handleFollow = () => {
        mutation.mutate(RelData.includes(currentUser.id));
    };

    const [openUpdate, setopenUpdate] = useState(false);
    // console.log(data);
    return (
        <div className="profile">
            {error ? (
                "Something went wrong!" + error
            ) : isLoading ? (
                "Loading..."
            ) : (
                <>
                    <div className="images">
                        <img
                            src={"/upload/" + data.coverpic}
                            alt={data.coverpic}
                            className="cover"
                        />
                        <img
                            src={"/upload/" + data.profilepic}
                            alt={data.profilepic}
                            className="dp"
                        />
                    </div>
                    <div className="profilecontainer">
                        <div className="userInfo">
                            <div className="left">
                                <a href="http://facebook.com">
                                    <FacebookTwoTone fontSize="medium" />
                                </a>
                                <a href="http://facebook.com">
                                    <LinkedIn fontSize="medium" />
                                </a>
                                <a href="http://facebook.com">
                                    <Instagram fontSize="medium" />
                                </a>
                                <a href="http://facebook.com">
                                    <Twitter fontSize="medium" />
                                </a>
                                <a href="http://facebook.com">
                                    <Pinterest fontSize="medium" />
                                </a>
                            </div>
                            <div className="center">
                                <span>{data.name}</span>
                                <div className="info">
                                    <div className="item">
                                        <Place />
                                        <span>{data.city}</span>
                                    </div>
                                    <div className="item">
                                        <Language />
                                        <span>{data.website}</span>
                                    </div>
                                </div>
                                {currentUser.id == CPuserid ? (
                                    <button onClick={() => setopenUpdate(true)}>
                                        Update
                                    </button>
                                ) : (
                                    <button onClick={handleFollow}>
                                        {!RisLoading &&
                                        RelData.includes(currentUser.id)
                                            ? "Following"
                                            : "follow"}
                                    </button>
                                )}
                            </div>
                            <div className="right">
                                <EmailOutlined />
                                <MoreVert />
                            </div>
                        </div>
                        <Posts CPuserid={CPuserid} />
                    </div>
                </>
            )}
            {openUpdate && <Update setopenUpdate={setopenUpdate} user={data} />}
        </div>
    );
};

export default Profile;
