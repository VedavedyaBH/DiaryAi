import { useState, useEffect } from "react";
import { useAuth } from "../Context/UserContext";
import axios from "axios";
import { useParams } from "react-router-dom";

function ChapterCard() {
    const { chapterId } = useParams();
    const [chapterContent, setChapterContent] = useState("");
    const [chapterTitle, setChapterTitle] = useState("");
    const [response, setResponse] = useState("");

    const { token } = useAuth();

    useEffect(() => {
        fetchChapter();
    }, []);

    const fetchChapter = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/user/v1/open/${chapterId}`,
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
                console.log(chapterRes.aiResponse);
                setResponse(chapterRes.aiResponse);
            }
        } catch (error) {
            console.error("Error fetching chapters:", error);
        }
    };
    return (
        <div className="max-w-3xl m-auto">
            <div className="text-black font-bold py-4 px-6 text-4xl font-bol">
                {chapterTitle}
            </div>
            <div
                dangerouslySetInnerHTML={{
                    __html: chapterContent,
                }}
            />
            <div>
                <div className="bg-gray-200 text-black rounded-lg p-5 mt-10 text-xl  font-bold ">Hello there!</div>
                <div className="mt-3 text-base text-gray-700 leading-relaxed mb-4">
                    {response}
                </div>
            </div>
        </div>
    );
}

export default ChapterCard;
