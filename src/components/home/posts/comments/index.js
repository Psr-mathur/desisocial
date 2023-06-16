import "./index.scss";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../context/authContext";
import { SendOutlined } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import makeReaquest from "../../makerequest.js";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Comments = ({ postid }) => {
    const { currentUser } = useContext(AuthContext);
    const [desc, setDesc] = useState("");

    const { isLoading, error, data } = useQuery(["comments"], async () => {
        const res = await makeReaquest.get("/comments?postid=" + postid);
        return res.data;
    });
    // console.log(data);

    const queryClient = useQueryClient();
    const mutation = useMutation(
        (newComment) => {
            return makeReaquest.post("/comments", newComment);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["comments"]);
                setDesc("");
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ desc: desc, postid: postid });
    };

    return (
        <div className="comments">
            <div className="write">
                <img src={currentUser.profilepic} alt="" />
                <input
                    type="text"
                    placeholder="write a comment"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <div onClick={handleClick}>
                    <SendOutlined className="sendlogo" />
                </div>
            </div>
            {error
                ? "Something went wrong!" + error
                : isLoading
                ? "Loading..."
                : data.map((comment) => {
                      return (
                          <div className="comment" key={comment.id}>
                              <div className="l">
                                  <img src={comment.profilepic} alt="" />
                                  <div className="info">
                                      <span>{comment.name}</span>
                                      <p>{comment.desc}</p>
                                  </div>
                              </div>
                              <span className="date">
                                  {moment(comment.createdat).fromNow()}
                              </span>
                          </div>
                      );
                  })}
        </div>
    );
};

export default Comments;
