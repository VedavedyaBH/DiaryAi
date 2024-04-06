import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/ChapterCard";
import { useAuth } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { ButtonSmall } from "../components/ButtonSmall";

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
            const res = await axios.get(
                `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/diaries`,
                {
                    params: {
                        limit: NoOfChaptersPerPage,
                        page: page,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

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
            ) : (
                <div className="max-w-3xl mx-auto m-2 p-4">
                    <div className="text-gray-500 font-light pb-4">
                        My Chapters
                    </div>
                    <InfiniteScroll
                        dataLength={chapters.length}
                        next={fetchChapters}
                        hasMore={hasMore}
                        loader={
                            <h4 className="text-center text-gray-200 text-xs">
                                Loading...
                            </h4>
                        }
                        endMessage={
                            <p className="text-center text-gray-200 text-xs">
                                You have reached the end
                            </p>
                        }
                    >
                        {chapters.map((item: any) => (
                            <Card
                                chapterId={item.id}
                                title={item.title}
                                author={author}
                                tag={item.tag}
                                content={item.content}
                                key={item.id}
                            />
                        ))}
                    </InfiniteScroll>
                </div>
            )}
        </>
    );
}

export default Diaries;
