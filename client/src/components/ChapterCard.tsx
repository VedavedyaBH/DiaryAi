import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ButtonSmall } from "./ButtonSmall";

function Card({ chapterId, title, author, content, tag }: any) {
    const navigate = useNavigate();
    const [tags, setTags] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        tagsSplit();
        setIsLoaded(true);
    }, []);

    const wrapContentInParagraphs = (htmlContent: string) => {
        const tagRegex = /<([^>]+)>/g;
        const wrappedContent = htmlContent.replace(tagRegex, (match) => {
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
        <div
            className={`text-sm md:text-md mb-4 p-4 overflow-hidden bg-neutral-800
            hover:shadow-sm hover:shadow-gray-500 item-center ease-in-out duration-300
            h-52 lg:h-52 lg:text-base rounded-lg ${
                isLoaded ? "animate-fade-in" : ""
            }`}
        >
            <div className="h-28">
                <div>
                    <button
                        onClick={handleCardClick}
                        className="text-md text-gray-200 lg:text-xl text-left font-bold"
                    >
                        {title}
                    </button>
                    <div
                        className="line-clamp-3 mt-2 text-gray-400 font-light text-sm"
                        dangerouslySetInnerHTML={{
                            __html: wrapContentInParagraphs(content),
                        }}
                    />
                </div>
            </div>
            <div className="flex justify-between items-center mt-2 lg:mt-5">
                <div className="flex justify-normal">
                    <div
                        className="flex justify-between"
                        style={{ marginLeft: "-1.3em" }}
                    >
                        {tags.map((each: any, index: number) => (
                            <div
                                key={index}
                                className="flex mt-2 mb-2 scale-50"
                                style={{ marginRight: "-2rem" }}
                            >
                                <ButtonSmall label={each}></ButtonSmall>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="scale-50">
                    <ButtonSmall
                        className="lg:text-lg"
                        label={author}
                    ></ButtonSmall>
                </div>
            </div>
        </div>
    );
}

export default Card;
