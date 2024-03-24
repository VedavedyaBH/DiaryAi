import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import CardsList from "../components/Card";
import { useAuth } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const NoOfChaptersPerPage = 5;

export function Diaries() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [chapters, setChapters] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [author, setAuthor] = useState("");
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchChapters();
    }, []);

    const fetchChapters = async () => {
        try {
            const res = await axios.get(`/api/v1/diaries`, {
                params: {
                    limit: NoOfChaptersPerPage,
                    page: page,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                const newChapters = res.data.data;
                const authorName = res.data.username;
                setChapters([...chapters, ...newChapters]);
                setAuthor(authorName);
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
                <div className="justify-center flex item-center mt-20 ">
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
                <div className="container mx-auto py-8">
                    <InfiniteScroll
                        dataLength={chapters.length}
                        next={fetchChapters}
                        hasMore={hasMore}
                        loader={
                            <h4 className="text-center text-xs">Loading...</h4>
                        }
                        endMessage={
                            <p className="text-center text-xs">
                                You have reached the end
                            </p>
                        }
                    >
                        <CardsList data={chapters} author={author} />
                    </InfiniteScroll>
                </div>
            )}
        </>
    );
}

export default Diaries;
