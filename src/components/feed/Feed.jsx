import Share from "../share/Share";
import Post from "../post/Post";
import "./feed.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed(props) {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function fetchPosts() {
            const response = props.username
                ? await axios.get(
                      `http://192.168.0.200:8800/api/posts/profile/${props.username}`
                  )
                : await axios.get(
                      `http://192.168.0.200:8800/api/posts/timeline/${user._id}`
                  );
            setPosts(
                response.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        }
        fetchPosts();
    }, [props.username, user._id]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!props.username || props.username === user.username) && <Share />}
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    );
}
