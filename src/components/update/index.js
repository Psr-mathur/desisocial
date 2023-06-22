import React, { useContext, useState } from "react";
import "./index.scss";
import makeReaquest from "../home/makerequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import { imagekitupload2 } from "../../imagekitsetup";

const Update = ({ setopenUpdate, user }) => {
    console.log("update", Date());
    const { setcurrentUser } = useContext(AuthContext);
    const [coverfile, setCoverfile] = useState(null);
    const [profilefile, setProfilefile] = useState(null);
    const [updatestatus, setUpdatestatus] = useState(false);
    const [texts, setTexts] = useState({
        name: user.name,
        city: user.city,
        website: user.website,
    });

    const handleChange = (e) => {
        setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const updateCurrentuser = async () => {
        const res = await makeReaquest.get("/users/find/" + user.id);
        setcurrentUser(res.data);
    };

    const queryClient = useQueryClient();
    const mutation = useMutation(
        async (user) => {
            const res = await makeReaquest.put("/users", user);
            // console.log(res.data);
            return res;
        },
        {
            onSuccess: () => {
                updateCurrentuser();
                queryClient.invalidateQueries(["user"]);
                queryClient.invalidateQueries(["posts"]);
                // console.log("us");
                setCoverfile(null);
                setProfilefile(null);
                setUpdatestatus(false);
            },
        }
    );
    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdatestatus(true);
        let coverUrl;
        let profileUrl;

        coverUrl = coverfile ? await imagekitupload2(coverfile) : user.coverpic;
        profileUrl = profilefile
            ? await imagekitupload2(profilefile)
            : user.profilepic;
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
                <div>
                    {updatestatus && (
                        <span style={{ color: "red" }}>Updating....</span>
                    )}
                </div>
                <button onClick={handleUpdate}>Update</button>
            </form>
        </div>
    );
};

export default Update;
