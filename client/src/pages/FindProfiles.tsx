import axios from "axios";
import { useState, useEffect } from "react";
import { useSearch } from "../Context/SearchContext";
import { useAuth } from "../Context/UserContext";
import { Card } from "../components/ProfileDisplayCard";
import InfiniteScroll from "react-infinite-scroll-component";

const NoOfChaptersPerPage = 5;

function FindProfiles() {
    const { query } = useSearch();
    const { token } = useAuth();
    const [profile, setProfile] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProfiles();
    }, [query]);

    const fetchProfiles = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/socials/profile/users/find`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        limit: NoOfChaptersPerPage,
                        page: page,
                        query: query,
                    },
                }
            );
            if (res.status === 200) {
                setLoading(false);
                const newProfiles = res.data;
                newProfiles.length > 0
                    ? setProfile([...profile, ...newProfiles])
                    : setHasMore(false);
                setPage(page + 1);
                setHasMore(
                    newProfiles.length === NoOfChaptersPerPage &&
                        newProfiles.length > 0
                );
            }
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <div>
            {loading ? (
                <div className="text-center p-4">Loading...</div>
            ) : profile.length === 0 ? (
                <div className="text-center p-4">
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
                            {profile.map((data: any) => (
                                <Card key={data.id} data={data} />
                            ))}
                        </InfiniteScroll>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FindProfiles;
