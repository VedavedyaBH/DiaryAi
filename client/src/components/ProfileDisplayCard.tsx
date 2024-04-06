import { useState, useEffect } from "react";
import { useAuth } from "../Context/UserContext";
import axios from "axios";
import { ButtonSmall } from "./ButtonSmall";
import check from "../assets/check.svg";
import { useNavigate } from "react-router-dom";

export const Card = ({ data }: any) => {
    const { token } = useAuth();
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [chaptersCount, setChaptersCount] = useState(0);
    const [followersCount, setFollowersCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [followed, setFollowed] = useState(false);
    const [unfollowed, setUnFollowed] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setData();
        setIsLoaded(true);
    }, [data]);

    const setData = () => {
        setUsername(data.username);
        setChaptersCount(data.diaries.length);
        setFollowersCount(data.socials.followers.length);
        setUserId(data.id);
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
    const handleCardClick = () => {
        navigate(`/profile/${userId}`);
    };
    return (
        <>
            <div
                onClick={handleCardClick}
                className="lg:max-w-4xl mx-auto mx-2 p-4"
            >
                <div
                    className={`flex justify-between text-gray-200 text-sm md:text-md bg-neutral-800
            hover:shadow-sm hover:shadow-gray-100 item-center ease-in-out duration-300
            h-52 lg:h-52 lg:text-base rounded-lg ${
                isLoaded ? "animate-fade-in" : ""
            }`}
                >
                    <div className="w-1/2 border rounded-lg flex items-center justify-center text-center">
                        {username}
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
                                    {chaptersCount}
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
        </>
    );
};
