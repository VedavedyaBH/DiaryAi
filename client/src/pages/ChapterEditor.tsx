import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import { useAuth } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ButtonSmall } from "../components/ButtonSmall";

export function Editor() {
    const navigate = useNavigate();
    const [privatePost, setPrivatePost] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const addContent = async () => {
        const today = {
            content: editor?.getHTML(),
            img: "",
        };
        if (
            today.content == "<p></p>" ||
            !today.content ||
            today.content.trim() === ""
        ) {
            alert("Cannot add empty content");
        } else {
            setLoading(true);
            try {
                if (today !== null) {
                    const res = await axios({
                        method: "post",
                        url: `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/diaries`,
                        data: {
                            today: today,
                            private: privatePost,
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (res.status === 201) {
                        setLoading(false);
                        navigate("/myDiary");
                    }
                }
            } catch (error: any) {
                console.log(error.message);
                if (error.response && error.response.status === 400) {
                    if (
                        error.response.data.includes("Username") ||
                        error.response.data.includes("EmailId")
                    ) {
                        alert(error.response.data);
                    } else {
                        alert("Something went wrong");
                    }
                }
            }
        }
    };

    const editor = useEditor({
        content: ``,
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "How was your Day..?",
            }),
        ],
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl  focus:outline-none custom-text",
            },
        },
    });

    return (
        <>
            {token === "" ? (
                <div className="justify-center flex item-center mt-20 ">
                    <div className="flex justify-center items-center">
                        <div className="font-bold text-4xl">Please Login</div>
                        <div>
                            <ButtonSmall
                                onClick={() => {
                                    navigate("/login");
                                }}
                                label={"Login"}
                            ></ButtonSmall>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {" "}
                    {loading ? (
                        <div className="text-center text-gray-400 mt-12">
                            Adding...
                        </div>
                    ) : (
                        <div
                            className={`lg:max-w-3xl mx-auto mt-5  p-4 ${
                                isLoaded ? "animate-fade-in" : ""
                            }`}
                        >
                            <div className="flex">
                                <div className="mr-2">
                                    <ButtonSmall
                                        onClick={addContent}
                                        label={"Add"}
                                    ></ButtonSmall>
                                </div>
                                <div>
                                    <ButtonSmall
                                        onClick={() => {
                                            setPrivatePost(!privatePost);
                                        }}
                                        label={
                                            privatePost ? "Private" : "Public"
                                        }
                                    ></ButtonSmall>
                                </div>
                            </div>

                            <div className="pt-5">
                                <EditorContent editor={editor}></EditorContent>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}
