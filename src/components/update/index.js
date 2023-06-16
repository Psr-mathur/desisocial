import React, { useState } from "react";
import "./index.scss";
import makeReaquest from "../home/makerequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Update = ({ setopenUpdate, user }) => {
    const [coverfile, setCoverfile] = useState(null);
    const [profilefile, setProfilefile] = useState(null);
    const [texts, setTexts] = useState({
        name: user.name,
        city: user.city,
        website: user.website,
    });

    const handleChange = (e) => {
        setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const upload = async (file) => {
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
        (user) => {
            return makeReaquest.put("/users", user);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["user"]);
                setCoverfile(null);
                setProfilefile(null);
            },
        }
    );

    const handleUpdate = async (e) => {
        e.preventDefault();
        let coverUrl;
        let profileUrl;

        coverUrl = coverfile ? await upload(coverfile) : user.coverpic;
        profileUrl = profilefile ? await upload(profilefile) : user.profilepic;
        mutation.mutate({
            ...texts,
            coverpic: coverUrl,
            profilepic: profileUrl,
        });
        setopenUpdate(false);
    };

    return (
        <div className="update">
            <div className="header">
                <h1>Update</h1>
                <button onClick={() => setopenUpdate(false)}>
                    <h1>X</h1>
                </button>
            </div>
            <form>
                <div>
                    <label htmlFor="cover">Cover</label>
                    <input
                        type="file"
                        name="cover"
                        onChange={(e) => setCoverfile(e.target.files[0])}
                    />
                </div>
                <div>
                    <label htmlFor="profile">Profile</label>
                    <input
                        type="file"
                        name="profile"
                        onChange={(e) => setProfilefile(e.target.files[0])}
                    />
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={texts.name}
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        name="city"
                        onChange={handleChange}
                        value={texts.city}
                    />
                </div>
                <div>
                    <label htmlFor="website">Website</label>
                    <input
                        type="text"
                        name="website"
                        onChange={handleChange}
                        value={texts.website}
                    />
                </div>
                <button onClick={handleUpdate}>Update</button>
            </form>
        </div>
    );
};

export default Update;
