import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/UserContext";
import { Card } from "../components/ProfileDisplayCard";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBar from "../components/SearchBar";

const NoOfProfilesPerPage = 5;

let page: number;
let entered = true;

function FindProfiles() {
    const { token } = useAuth();
    const [profile, setProfile] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const fetchProfiles = async () => {
        try {
            setLoading(true);
            const res = await axios.get<any[]>(
                `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/socials/profile/users/find`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        limit: NoOfProfilesPerPage,
                        page: page,
                        query: inputValue,
                    },
                }
            );
            if (res.status === 200) {
                setLoading(false);
                const newProfiles = res.data;
                if (newProfiles.length === 0) {
                    setHasMore(false);
                } else {
                    setProfile((prevProfile: any) => [
                        ...prevProfile,
                        ...newProfiles,
                    ]);
                    page++;
                }
            }
        } catch (error: any) {
            console.error(error.message);
        }
    };

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    const handleSearch = () => {
        entered = false;
        page = 0;
        page++;
        setProfile([]);
        fetchProfiles();
    };

    return (
        <div
            className={`item-center text-center ${
                isLoaded ? "animate-fade-in" : ""
            }`}
        >
            <div className={`flex justify-center my-4`}>
                <SearchBar
                    handleSearch={handleSearch}
                    handleInputChange={handleInputChange}
                    inputValue={inputValue}
                />
            </div>
            {!entered && (
                <div className="mt-12">
                    {loading && profile.length === 0 ? (
                        <div className="text-center text-stone-100 p-4">Loading...</div>
                    ) : profile.length === 0 ? (
                        <div className="text-center text-stone-100 p-4">
                            No user found for the entered username
                        </div>
                    ) : (
                        <div>
                            <div className="lg:max-w-lg m-auto justify-center">
                                <InfiniteScroll
                                    dataLength={profile.length}
                                    next={fetchProfiles}
                                    hasMore={hasMore}
                                    loader={
                                        <h4 className="text-center text-xs">
                                            Loading...
                                        </h4>
                                    }
                                    endMessage={
                                        <p className="text-center text-xs">
                                            You have reached the end
                                        </p>
                                    }
                                >
                                    {profile.map((data: any, index: number) => (
                                        <Card key={index} data={data} />
                                    ))}
                                </InfiniteScroll>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default FindProfiles;
