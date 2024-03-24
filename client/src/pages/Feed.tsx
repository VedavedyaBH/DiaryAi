import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import CardsList from "../components/Card";
import { useAuth } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";

const NoOfChaptersPerPage = 5;
const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export function Feed() {
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const [chapters, setChapters] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchChapters();
    }, []);

    const fetchChapters = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/socials/feed`, {
                params: {
                    limit: NoOfChaptersPerPage,
                    page: page,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                const newChapters = res.data;
                newChapters.length > 0
                    ? setChapters([...chapters, ...newChapters])
                    : setHasMore(false);
                setPage(page + 1);
                setHasMore(
                    newChapters.length === NoOfChaptersPerPage &&
                        newChapters.length > 0
                );
            }
        } catch (error) {
            console.error("Error fetching chapters:", error);
        }
    };

    return (
        <>
            {token === "" ? (
                <div className="justify-center flex item-center mt-20">
                    <div className="flex justify-center items-center">
                        <div className="font-bold text-4xl">Please Login</div>
                        <div>
                            <button
                                onClick={() => {
                                    navigate("/login");
                                }}
                                className="bg-black text-white rounded-lg w-12 h-8 ml-4"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="bg-white max-w-3xl mx-auto m-2 p-4">
                        <div className="text-gray-500 font-light border-b pb-4">
                            For you
                        </div>
                        <InfiniteScroll
                            dataLength={chapters.length}
                            next={fetchChapters}
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
                            <CardsList data={chapters} />
                        </InfiniteScroll>
                    </div>
                </div>
            )}
        </>
    );
}

export default Feed;
