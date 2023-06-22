import React, { useContext } from "react";
import "./index.scss";
import {
    MessageOutlined as Messages,
    Person2Outlined as Friends,
    Diversity3Outlined as Groups,
    SmartDisplaySharp as Watch,
    HistoryToggleOffSharp as Memories,
    CalendarMonthOutlined as Events,
    SportsEsportsOutlined as Gaming,
    VideoChatOutlined as Videos,
    CollectionsOutlined as Gallery,
    StorefrontOutlined as Marketplace,
    SavingsOutlined as Fundraiser,
    LaptopChromebookOutlined as Tutorials,
    MenuBookOutlined as Courses,
} from "@mui/icons-material";
import { AuthContext } from "../../context/authContext";

const Leftbar = () => {
    const { currentUser } = useContext(AuthContext);
    // console.log("CU ", currentUser);
    return (
        <div className="leftbar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img src={currentUser.profilepic} alt="" />
                        <span>{currentUser.name}</span>
                    </div>
                    <div className="item">
                        <Friends />
                        <span>Friends</span>
                    </div>
                    <div className="item">
                        <Groups />
                        <span>Groups</span>
                    </div>
                    <div className="item">
                        <Marketplace />
                        <span>Marketplace</span>
                    </div>
                    <div className="item">
                        <Watch />
                        <span>Watch</span>
                    </div>
                    <div className="item">
                        <Memories />
                        <span>Memories</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Your Shortcuts</span>
                    <div className="item">
                        <Events />
                        <span>Events</span>
                    </div>
                    <div className="item">
                        <Gaming />
                        <span>Gaming</span>
                    </div>
                    <div className="item">
                        <Gallery />
                        <span>Gallery</span>
                    </div>
                    <div className="item">
                        <Videos />
                        <span>Videos</span>
                    </div>
                    <div className="item">
                        <Messages />
                        <span>Messages</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Others</span>
                    <div className="item">
                        <Fundraiser />
                        <span>Fundraiser</span>
                    </div>
                    <div className="item">
                        <Tutorials />
                        <span>Tutorials</span>
                    </div>
                    <div className="item">
                        <Courses />
                        <span>Courses</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leftbar;
