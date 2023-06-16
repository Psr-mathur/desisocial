import React, { useContext, useState } from "react";
import {
    AttachFileOutlined,
    AddLocationAltOutlined,
    AlternateEmailOutlined,
} from "@mui/icons-material";
import { AuthContext } from "../../../context/authContext";
import "./index.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import makeReaquest from "../makerequest";

const Addpost = () => {
    const { currentUser } = useContext(AuthContext);
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeReaquest.post("/upload", formData);
            return res.data;
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const queryClient = useQueryClient();
    const mutation = useMutation(
        (newPost) => {
            return makeReaquest.post("/posts", newPost);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"]);
                setDesc("");
                setFile(null);
            },
        }
    );

    let imgUrl = "";
    const handleClick = async (e) => {
        // e.preventDefault();
        if (file) imgUrl = await upload();
        mutation.mutate({ desc: desc, img: imgUrl });
    };

    return (
        <div className="addpost">
            <div className="upper">
                <div className="user">
                    <img src={currentUser.profilepic} alt="" />
                    <input
                        type="text"
                        placeholder={`What's on your mind ${currentUser.name}?`}
                        onChange={(e) => setDesc(e.target.value)}
                        value={desc}
                    />
                </div>
            </div>
            <div className="preview">
                {file && (
                    <img
                        className="file"
                        alt=""
                        src={URL.createObjectURL(file)}
                    />
                )}
            </div>
            <hr />
            <div className="down">
                <div className="left">
                    <div className="addimg">
                        <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label htmlFor="file">
                            <div>
                                <AttachFileOutlined fontSize="samll" />
                                <span>Add Image</span>
                            </div>
                        </label>
                    </div>
                    <div className="addplace">
                        <AddLocationAltOutlined fontSize="samll" />
                        <span>Add Place</span>
                    </div>
                    <div className="tag">
                        <AlternateEmailOutlined fontSize="samll" />
                        <span>Tag Friends</span>
                    </div>
                </div>

                <div className="right">
                    <button onClick={handleClick}>Share</button>
                </div>
            </div>
        </div>
    );
};

export default Addpost;
