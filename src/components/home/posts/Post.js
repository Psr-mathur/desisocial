import Comments from "./comments";
import {
    FavoriteBorderOutlined,
    FavoriteOutlined,
    TextsmsOutlined,
    ShareOutlined,
    MoreHoriz,
} from "@mui/icons-material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeReaquest from "../makerequest.js";
import { AuthContext } from "../../../context/authContext";
import Postmenu from "./Postmenu";

const Post = ({ post }) => {
    const [showComment, setshowComment] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const { isLoading, error, data } = useQuery(["likes", post.id], () => {
        return makeReaquest
            .get("/likes?postid=" + post.id)
            .then((res) => res.data);
    });
    const queryClient = useQueryClient();
    const mutation = useMutation(
        (liked) => {
            if (!liked) return makeReaquest.post("/likes", { postid: post.id });
            return makeReaquest.delete("/likes?postid=" + post.id);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["likes"]);
                // setDesc("");
            },
        }
    );
    const handlelike = () => {
        mutation.mutate(data.includes(currentUser.id));
    };
    const handleshowComment = () => {
        setshowComment(!showComment);
    };
    // console.log(post);
    const [openmenu, setopenmenu] = useState(false);
    // if (openmenu) console.log(post);

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userinfo">
                        <img src={post.profilepic} alt="" />
                        <div className="details">
                            <Link
                                to={`/profile/${post.userid}`}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <span className="name">{post.name}</span>
                            </Link>
                            <span className="date">
                                {moment(post.createdat).fromNow()}
                            </span>
                        </div>
                    </div>
                    <MoreHoriz
                        className="threedot"
                        onClick={() => setopenmenu((prev) => !prev)}
                    />
                    {openmenu && (
                        <Postmenu
                            currentUserid={currentUser.id}
                            postid={post.id}
                            postUserid={post.userid}
                        />
                    )}
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={post.img} alt="" />
                </div>
                <div className="info">
                    {error ? (
                        "SWR"
                    ) : isLoading ? (
                        "Loading..."
                    ) : (
                        <div className="item">
                            {data.includes(currentUser.id) ? (
                                <FavoriteOutlined
                                    onClick={handlelike}
                                    style={{ color: "#ff0000" }}
                                />
                            ) : (
                                <FavoriteBorderOutlined onClick={handlelike} />
                            )}

                            <span>{data.length} Likes</span>
                        </div>
                    )}

                    <div className="item" onClick={handleshowComment}>
                        <TextsmsOutlined />
                        <span>Comments</span>
                    </div>
                    <div className="item">
                        <ShareOutlined />
                        <span>Share</span>
                    </div>
                </div>
                {showComment && <Comments postid={post.id} />}
            </div>
        </div>
    );
};
export default Post;
