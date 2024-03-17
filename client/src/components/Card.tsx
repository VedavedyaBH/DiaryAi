import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Card = ({ chapterId, title, content, tag }: any) => {
    const navigate = useNavigate();
    const [tags, setTags] = useState<string[]>([]);
    useEffect(() => {
        tagsSplit();
    }, []);

    const wrapContentInParagraphs = (htmlContent: string) => {
        const tagRegex = /<([^>]+)>/g;
        const wrappedContent = htmlContent.replace(tagRegex, (match, group) => {
            const content = match.replace(/<\/?[^>]+(>|$)/g, "");
            return `<p>${content}</p>`;
        });
        return wrappedContent;
    };

    const handleCardClick = () => {
        navigate(`/chapter/${chapterId}`);
    };
    const tagsSplit = () => {
        if (tag) {
            const tagArray = tag.split(",");
            setTags(tagArray);
        }
    };

    return (
        <div className="flex text-sm md:text-md lg:text-base bg-white border-b p-4 h-30 lg:h-38 overflow-hidden">
            <div className="mb-2">
                <button onClick={handleCardClick} className="text-xl font-bold">
                    {title}
                </button>
                <div
                    className="line-clamp-3 mt-2"
                    dangerouslySetInnerHTML={{
                        __html: wrapContentInParagraphs(content),
                    }}
                />
                <div className="flex">
                    {tags.map((each: any, index: number) => (
                        <div
                            key={index}
                            className="p-1 bg-gray-800 flex items-center justify-center rounded-lg text-white text-xs mt-3 h-6 w-16 m-1"
                        >
                            {each}
                        </div>
                    ))}{" "}
                </div>
            </div>
        </div>
    );
};

const CardsList = ({ data }: any) => {
    return (
        <div className="grid grid-cols-1 max-w-3xl justify-center m-auto">
            {data.map((item: any, index: any) => (
                <Card
                    chapterId={item.id}
                    title={item.title}
                    tag={item.tag}
                    content={item.content}
                    key={index}
                />
            ))}
        </div>
    );
};

export default CardsList;
