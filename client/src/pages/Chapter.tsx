import { useState, useEffect } from "react";
import { useAuth } from "../Context/UserContext";
import axios from "axios";
import { useParams } from "react-router-dom";

function ChapterCard() {
    const { chapterId } = useParams();
    const [chapterContent, setChapterContent] = useState("");
    const [chapterTitle, setChapterTitle] = useState("");
    const [response, setResponse] = useState("");
    const [isOwner, setIsOwner] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const { token } = useAuth();

    useEffect(() => {
        isOwnerCheck();
        setIsLoaded(true);
    }, []);
    const isOwnerCheck = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/all/diaries`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.status === 200) {
                const chapterIds = res.data.chapters;
                setIsOwner(chapterIds.includes(chapterId));
                fetchChapter();
            }
        } catch (error) {
            console.error("Error fetching chapters:", error);
        }
    };
    const fetchChapter = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/diaries/${chapterId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.status === 200) {
                const chapterRes = res.data;
                setChapterContent(chapterRes.content);
                setChapterTitle(chapterRes.title);
                setResponse(chapterRes.aiResponse);
            }
        } catch (error) {
            console.error("Error fetching chapters:", error);
        }
    };
    return (
        <div
            className={`lg:max-w-4xl mx-auto m-2 p-4 ${
                isLoaded ? "animate-fade-in" : ""
            }`}
        >
            <div
                className={`text-sm md:text-md mb-4 p-4 bg-neutral-800 mt-4 mb-4
            hover:shadow-lg item-center ease-in-out duration-300 w-4xl
            lg:text-base rounded-lg`}
            >
                <div className="text-left text-gray-200 font-bold pb-8 text-xl lg:text-4xl">
                    {chapterTitle}
                </div>
                <div
                    className="font-Kalam mb-10 text-gray-300"
                    dangerouslySetInnerHTML={{
                        __html: chapterContent,
                    }}
                />
                {isOwner ? (
                    <div>
                        <div className="bg-neutral-900 text-white rounded-lg p-5 mt-10 lg:text-xl  font-bold ">
                            Hello there!
                        </div>
                        <div className="mt-3 text-base text-gray-300 leading-relaxed mb-4">
                            {response}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default ChapterCard;
