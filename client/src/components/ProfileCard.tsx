import { useAuth } from "../Context/UserContext";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonSmall } from "../components/ButtonSmall";
import { useParams } from "react-router-dom";
import Card from "../components/ChapterCard";
import check from "../assets/check.svg";

function ProfileCard() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [userObj, setUserObj] = useState<any>("");
    const [diaries, setDiaries] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [diariesCount, setDiariesCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const { userId } = useParams();
    const [followed, setFollowed] = useState(false);
    const [unfollowed, setUnFollowed] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        fetchUser();
    }, []);

    useEffect(() => {
        setDiariesCount(diaries.length);
        setFollowersCount(followers.length);
        setFollowingCount(following.length);
    }, [diaries, followers, following]);

    const fetchUser = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/socials/profile/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        userId: userId,
                    },
                }
            );
            const data = res.data;
            setUserObj(data);
            setIsLoading(false);
            setDiaries(data.diaries);
            setFollowers(data.socials.followers);
            setFollowing(data.socials.following);
        } catch (error: any) {
            console.log(error.message);
        }
    };
    const handleFollowClick = async () => {
        try {
            const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/socials/follow`,
                data: {
                    toFollow: userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status == 201) {
                setFollowed(true);
                setUnFollowed(false);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const handleUnfollowClick = async () => {
        try {
            const res = await axios({
                method: "delete",
                url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/socials/follow`,
                data: {
                    toFollow: userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status == 200) {
                setUnFollowed(true);
                setFollowed(false);
            }
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <>
            {token === "" ? (
                <div
                    className="flex justify-center items-center \
                                justify-center flex item-center mt-20"
                >
                    <div className="font-bold text-gray-200 text-4xl">
                        Please Login
                        <div>
                            <ButtonSmall
                                label={"Login"}
                                onClick={() => {
                                    navigate("/login");
                                }}
                                className="bg-black text-white rounded-lg w-12 h-8 ml-4"
                            ></ButtonSmall>
                        </div>
                    </div>
                </div>
            ) : isLoading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div
                    className={`max-w-3xl mx-auto mt-4 my-auto p-4 ${
                        isLoaded ? "animate-fade-in" : ""
                    }`}
                >
                    <div
                        className={`flex justify-between text-gray-200 text-sm md:text-md bg-neutral-800
                                    item-center ease-in-out duration-300
                                    h-52 lg:h-52 lg:text-base rounded-lg ${
                                        isLoaded ? "animate-fade-in" : ""
                                    }`}
                    >
                        <div className="w-1/2 border rounded-lg flex items-center justify-center text-center">
                            {userObj.username}
                        </div>
                        <div className="w-1/2 grid justify-center p-2 items-center text-center">
                            <div>
                                <div>
                                    Followers{" "}
                                    <span className="font-bold">
                                        {followersCount}
                                    </span>{" "}
                                </div>
                                <div>
                                    Chapters{" "}
                                    <span className="font-bold">
                                        {diariesCount}
                                    </span>
                                </div>
                                <div>
                                    Following{" "}
                                    <span className="font-bold">
                                        {followingCount}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row justify-center lg:justify-between w-full">
                                <div className="mx-2 mb-2 lg:mb-0 lg:mr-2">
                                    <ButtonSmall
                                        onClick={handleFollowClick}
                                        label={
                                            followed ? (
                                                <img
                                                    className="ml-4 lg:ml-0 h-4"
                                                    src={check}
                                                    alt="check-mark"
                                                />
                                            ) : (
                                                "Follow"
                                            )
                                        }
                                    />
                                </div>
                                <div className="mx-2 lg:ml-2">
                                    <ButtonSmall
                                        onClick={handleUnfollowClick}
                                        label={
                                            unfollowed ? (
                                                <img
                                                    className="ml-2 lg:ml-0 h-4"
                                                    src={check}
                                                    alt="check-mark"
                                                />
                                            ) : (
                                                "UnFollow"
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="max-w-3xl mx-auto my-auto p-4">
                <div className="text-center text-gray-200 text-xs mb-4">
                    You can only see public chapters
                </div>
                {diaries.map((item: any, index) => (
                    <Card
                        chapterId={item.id}
                        title={item.title}
                        author={userObj.username}
                        tag={item.tag}
                        content={item.content}
                        key={index}
                    />
                ))}
            </div>
        </>
    );
}

export default ProfileCard;
