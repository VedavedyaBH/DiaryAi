import { useState, useEffect } from "react";
import { useAuth } from "../Context/UserContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function ChapterCard() {
    const { user } = useAuth();
    const { chapterId } = useParams();
    const [chapterContent, setChapterContent] = useState("");
    const [chapterTitle, setChapterTitle] = useState("");
    const [response, setResponse] = useState("");
    const [isOwner, setIsOwner] = useState(false);

    const { token } = useAuth();

    useEffect(() => {
        isOwnerCheck();
    }, []);
    const isOwnerCheck = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/api/v1/all/diaries`,
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
                `${BASE_URL}/api/v1/diaries/${chapterId}`,
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
        <div className="bg-white p-6 mt-4 max-w-3xl m-auto">
            <div className="text-left font-bold pb-8 text-xl lg:text-4xl">
                {chapterTitle}
            </div>
            <div
                className="font-Kalam mb-10"
                dangerouslySetInnerHTML={{
                    __html: chapterContent,
                }}
            />
            {isOwner ? (
                <div>
                    <div className="bg-gray-200 text-black rounded-lg p-5 mt-10 lg:text-xl  font-bold ">
                        Hello there!
                    </div>
                    <div className="mt-3 text-base text-gray-700 leading-relaxed mb-4">
                        {response}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default ChapterCard;
