import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import { useAuth } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ButtonSmall } from "../components/ButtonSmall";

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export function Editor() {
    const navigate = useNavigate();
    const [privatePost, setPrivatePost] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();
    const addContent = async () => {
        setLoading(true);
        const today = {
            content: editor?.getHTML(),
            img: "",
        };

        try {
            if (today !== null) {
                const res = await axios({
                    method: "post",
                    url: `${BASE_URL}/api/v1/diaries`,
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
                class: "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl  focus:outline-none",
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
                            <button
                                onClick={() => {
                                    navigate("/login");
                                }}
                                className="bg-black text-white rounded-lg w-12 h-8 ml-4"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {" "}
                    {loading ? (
                        <div className="text-center mt-12">Adding</div>
                    ) : (
                        <div className="relative lg:max-w-3xl mx-auto my-5 ">
                            <ButtonSmall
                                label={"Add"}
                                onClick={addContent}
                            ></ButtonSmall>
                            <button
                                className="absolutemax-w-36 h-6 ml-2 bg-black rounded-xl text-xs text-gray-200 text-center w-12"
                                onClick={() => {
                                    setPrivatePost(!privatePost);
                                }}
                            >
                                {privatePost ? "Private" : "Public"}
                            </button>
                            <div>
                                <EditorContent editor={editor}></EditorContent>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}
