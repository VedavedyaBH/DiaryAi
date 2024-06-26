import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/ChapterCard";
import { useAuth } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import add from "../assets/add.png";
const NoOfChaptersPerPage = 5;

interface Chapter {
    id: string;
    title: string;
    author: string;
    tag: string;
    content: string;
}

export function Feed() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        token !== "" ? fetchChaptersForUser() : fetchChaptersForPublic();
    }, []);

    const fetchChaptersForUser = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/socials/feed`,
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
                const feedWithAuthor = res.data;
                const updatedChapters: Chapter[] = [];
                feedWithAuthor.forEach((item: any) => {
                    const { username, diaries } = item;
                    diaries.forEach((diary: any) => {
                        updatedChapters.push({
                            ...diary,
                            author: username,
                        });
                    });
                });
                setChapters((prevChapters) => [
                    ...prevChapters,
                    ...updatedChapters,
                ]);
                setPage((prevPage) => prevPage + 1);
                setHasMore(
                    feedWithAuthor.length === NoOfChaptersPerPage &&
                        feedWithAuthor.length > 0
                );
            }
        } catch (error) {
            console.error("Error fetching chapters:", error);
        }
    };
    const fetchChaptersForPublic = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/socials/public/feed`,
                {
                    params: {
                        limit: NoOfChaptersPerPage,
                        page: page,
                    },
                }
            );

            if (res.status === 200) {
                const feedWithAuthor = res.data;
                const updatedChapters: Chapter[] = [];
                feedWithAuthor.forEach((item: any) => {
                    const { username, diaries } = item;
                    diaries.forEach((diary: any) => {
                        updatedChapters.push({
                            ...diary,
                            author: username,
                        });
                    });
                });
                setChapters((prevChapters) => [
                    ...prevChapters,
                    ...updatedChapters,
                ]);
                setPage((prevPage) => prevPage + 1);
                setHasMore(
                    feedWithAuthor.length === NoOfChaptersPerPage &&
                        feedWithAuthor.length > 0
                );
            }
        } catch (error) {
            console.error("Error fetching chapters:", error);
        }
    };

    return (
        <>
            <div>
                {token === "" ? (
                    <div>
                        <div className="max-w-3xl mx-auto m-2 p-4">
                            <div className="flex justify-between">
                                <div className="text-gray-500 font-light pb-4">
                                    Login for personalised feeds
                                </div>
                            </div>

                            <InfiniteScroll
                                dataLength={chapters.length}
                                next={fetchChaptersForPublic}
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
                                {chapters.map((item, index) => (
                                    <Card
                                        chapterId={item.id}
                                        title={item.title}
                                        author={item.author}
                                        tag={item.tag}
                                        content={item.content}
                                        key={index}
                                    />
                                ))}
                            </InfiniteScroll>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="max-w-3xl mx-auto m-2 p-4">
                            <div className="flex justify-between">
                                <div className="text-gray-500 font-light pb-4">
                                    For you
                                </div>
                                <img
                                    onClick={() => navigate("/today")}
                                    className="h-6 hover:scale-110 duration-300 ease-in-out"
                                    src={add}
                                ></img>
                            </div>

                            <InfiniteScroll
                                dataLength={chapters.length}
                                next={fetchChaptersForUser}
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
                                {chapters.map((item, index) => (
                                    <Card
                                        chapterId={item.id}
                                        title={item.title}
                                        author={item.author}
                                        tag={item.tag}
                                        content={item.content}
                                        key={index}
                                    />
                                ))}
                            </InfiniteScroll>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Feed;
