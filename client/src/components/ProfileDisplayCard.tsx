import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearch } from "../Context/SearchContext";

export const Card = ({ data }: any) => {
    const navigate = useNavigate();
    const { setQuery } = useSearch();
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
    };

    return (
        <div className="flex text-sm md:text-md lg:text-base bg-white border-b p-4 h-30 lg:h-38 overflow-hidden">
            <div className="mb-2">
                <div className="mr-5 mt-2 text-sm p-1">{username}</div>
                <div className="mr-5 mt-2 text-sm p-1">
                    Followers {followersCount}
                </div>
                <div className="mr-5 mt-2 text-sm p-1">
                    Chapters {chaptersCount}
                </div>
            </div>
        </div>
    );
};
