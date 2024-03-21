import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
    const handleClick = () => {
        localStorage.removeItem("user");
        window.location.reload(false);
    };

    const { user } = useContext(AuthContext);

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">Lamasocial</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input
                        className="searchInput"
                        placeholder="Search for friend, post or video"
                    />
                </div>
            </div>
            <div className="topbarRight">
                <Link to={`/profile/${user.user_id}`}>
                    <img
                        className="topbarImg"
                        src={
                            user.profile_picture
                                ? user.profile_picture
                                : "/person/noAvatar.jpeg"
                        }
                        alt=""
                    />
                </Link>
                <button className="topbarLogout" onClick={handleClick}>
                    Logout
                </button>
            </div>
        </div>
    );
}
