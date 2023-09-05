import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { makeRequest } from "../../axios";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const user_id = useParams().user_id;
    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetchUser() {
            const response = await makeRequest.get(
                `/users/${user_id}`
            );
            setUser(response.data);
        }
        fetchUser();
    }, [user_id]);

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={
                                    user.cover_picture
                                        ? PF + user.cover_picture
                                        : PF + "person/noCover.jpeg"
                                }
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={
                                    user.profile_picture
                                        ? PF + user.profile_picture
                                        : PF + "person/noAvatar.jpeg"
                                }
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.user_name}</h4>
                            {/* {user.desc && (
                                <span className="profileInfoDesc">
                                    {user.desc}
                                </span>
                            )} */}
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed user_id={user_id} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    );
}
