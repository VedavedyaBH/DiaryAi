import { useState, useEffect } from "react";
import { useAuth } from "../Context/UserContext";
import axios from "axios";

export const Card = ({ data }: any) => {
    const { token } = useAuth();
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [chaptersCount, setChaptersCount] = useState(0);
    const [followersCount, setFollowersCount] = useState(0);

    useEffect(() => {
        setData();
    }, [data]);

    const setData = () => {
        setUsername(data.username);
        setChaptersCount(data.diaries.length);
        setFollowersCount(data.socials.followers.length);
        setUserId(data.id);
    };

    const handleFollowClick = async () => {
        try {
            await axios({
                method: "post",
                url: `/api/v1/socials/follow`,
                data: {
                    toFollow: userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const handleUnfollowClick = async () => {
        try {
            await axios({
                method: "delete",
                url: `/api/v1/socials/follow`,
                data: {
                    toFollow: userId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <div className="bg-white shadow-sm mb-2 mt-2 rounded-md shadow-sm p-2 lg:p-4">
            <div className="lg:flex border-gray-200 items-center justify-between lg:m-4">
                <div className="flex text-center items-center justify-center">
                    <button className="bg-white lg:text-lg w-24 h-24 border shadow-sm font-bold">
                        {username}
                    </button>
                    <div className="lg:text-sm text-gray-500 ml-4">
                        Followers {followersCount}
                    </div>
                    <div className="text-sm text-gray-500 ml-4">
                        Chapters {chaptersCount}
                    </div>
                </div>

                <div className="flex items-center mt-4 lg:mt-0 space-x-2">
                    <button
                        onClick={handleFollowClick}
                        className="bg-black rounded-xl text-xs text-gray-200  text-center h-6 w-12 lg:h-6 lg:w-14"
                    >
                        Follow
                    </button>
                    <button
                        onClick={handleUnfollowClick}
                        className="bg-black rounded-xl text-xs text-gray-200  text-center h-6 w-12 lg:h-6 lg:w-14"
                    >
                        Unfollow
                    </button>
                </div>
            </div>
        </div>
    );
};
