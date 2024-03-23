import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Card = ({ chapterId, title, author, content, tag }: any) => {
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
        <div className="flex text-sm md:text-md lg:text-base bg-white border-b mb-4 p-4 h-30 lg:h-38 overflow-hidden">
            <div className="mb-2 ">
                <button
                    onClick={handleCardClick}
                    className="text-md lg:text-xl text-left font-bold"
                >
                    {title}
                </button>
                <div
                    className="line-clamp-3 mt-2"
                    dangerouslySetInnerHTML={{
                        __html: wrapContentInParagraphs(content),
                    }}
                />

                <div className="flex justify-between items-center p-1">
                    <div className="flex flex-wrap">
                        {tags.map((each: any, index: number) => (
                            <div
                                key={index}
                                className="bg-gray-800 lg:flex items-center lg:justify-center rounded-md lg:rounded-lg text-white text-center text-xs h-4 w-12 lg:h-6 lg:w-16 m-1"
                            >
                                {each}
                            </div>
                        ))}
                    </div>
                    <div className="text-xs bg-gray-200 rounded-md lg:text-md">
                        Author{" "}
                        <span className="font-bold text-md lg:text-lg">
                            {author}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CardsList = ({ data, author }: any) => {
    return (
        <div className="grid grid-cols-1 max-w-3xl justify-center m-auto">
            {data.map((item: any, index: any) => (
                <Card
                    chapterId={item.id}
                    title={item.title}
                    author={author}
                    tag={item.tag}
                    content={item.content}
                    key={index}
                />
            ))}
        </div>
    );
};

export default CardsList;
