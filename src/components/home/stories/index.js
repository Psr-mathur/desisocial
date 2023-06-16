import React, { useContext } from "react";
import "./index.scss";
import { AuthContext } from "../../../context/authContext";
const Stories = () => {
    const storiesData = [
        {
            id: 1,
            name: "Prakash",
            img: "https://picsum.photos/580",
        },
        {
            id: 2,
            name: "Prakash",
            img: "https://picsum.photos/590",
        },
        {
            id: 3,
            name: "Prakash",
            img: "https://picsum.photos/570",
        },
        {
            id: 4,
            name: "Prakash",
            img: "https://picsum.photos/560",
        },
    ];
    const { currentUser } = useContext(AuthContext);
    return (
        <div className="stories">
            <div className="story">
                <img src={currentUser.profilepic} alt="pp" />
                <span>{currentUser.name}</span>
                <button>+</button>
            </div>
            {storiesData.map((story) => {
                return (
                    <div className="story" key={story.id}>
                        <img src={story.img} alt="pp" />
                        <span>{story.name}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default Stories;
