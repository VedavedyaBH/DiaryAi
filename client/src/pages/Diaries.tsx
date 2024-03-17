import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import CardsList from "../components/Card";
import { useAuth } from "../Context/UserContext";

const NoOfChaptersPerPage = 5;

export function Diaries() {
    const { token, user } = useAuth();
    const [chapters, setChapters] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchChapters();
    }, []);

    const fetchChapters = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/user/v1/diary`, {
                params: {
                    userId: user,
                    limit: NoOfChaptersPerPage,
                    page: page,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                const newChapters = res.data.days;
                setChapters([...chapters, ...newChapters]);
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
        <div className="container mx-auto py-8">
            <InfiniteScroll
                dataLength={chapters.length}
                next={fetchChapters}
                hasMore={hasMore}
                loader={<h4 className="text-center text-xs">Loading...</h4>}
                endMessage={
                    <p className="text-center text-xs">
                        You have reached the end
                    </p>
                }
            >
                <CardsList data={chapters} />
            </InfiniteScroll>
        </div>
    );
}

export default Diaries;
