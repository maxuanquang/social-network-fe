import { useContext, useRef, useState } from "react";
import "./share.css";
import {
    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel,
} from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { makeRequest } from "../../axios";

export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const content_text = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            user_id: user.user_id,
            content_text: content_text.current.value,
            content_image_path: [],
        };

        // if (file) {
        //     const data = new FormData();
        //     data.append("file", file);
        //     try {
        //         const res = await makeRequest.post(
        //             "http://192.168.0.200:8800/api/upload",
        //             data
        //         );
        //         newPost.content_image_path.push(res.data.filename);
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }

        if (file) {
            const presignedUrl =
                "https://social-network-s3-mxq.s3.ap-southeast-1.amazonaws.com/U/D5cpeaR/wZvzwQoik5BY59w07L4GHQ?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQS4XPEJB2YQESZ65%2F20230904%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20230904T081508Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=d12a0538033f17e696749faa6db8aeab15188f4c263a8c9c2cb7e612711d314b";
            const filename = presignedUrl.split("?")[0];

            try {
                const res = await fetch({
                    method: "PUT",
                    headers: {
                        "Content-Type": "image/png",
                    },
                    body: file,
                });
                console.log(res.data);
                newPost.content_image_path.push(filename);
            } catch (err) {
                console.log(err);
            }
        }

        try {
            await makeRequest.post("/posts", newPost);
            // window.location.reload();
        } catch (err) {}
    };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        className="shareProfileImg"
                        src={
                            user.profile_picture
                                ? PF + user.profile_picture
                                : PF + "person/noAvatar.jpeg"
                        }
                        alt=""
                    />
                    <input
                        className="shareInput"
                        placeholder={
                            "What's in your mind " + user.user_name + "?"
                        }
                        ref={content_text}
                    />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img
                            className="shareImg"
                            src={URL.createObjectURL(file)}
                            alt=""
                        />
                        <Cancel
                            className="shareImgCancel"
                            onClick={() => setFile(null)}
                        />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia
                                className="shareOptionIcon"
                                htmlColor="tomato"
                            />
                            <span className="shareOptionText">
                                Photo or Video
                            </span>
                            <input
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                style={{ display: "none" }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <Label
                                className="shareOptionIcon"
                                htmlColor="blue"
                            />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room
                                className="shareOptionIcon"
                                htmlColor="green"
                            />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions
                                className="shareOptionIcon"
                                htmlColor="goldenrod"
                            />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">
                        Share
                    </button>
                </form>
            </div>
        </div>
    );
}
