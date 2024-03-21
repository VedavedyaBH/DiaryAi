import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import { useAuth } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Editor() {
    const navigate = useNavigate();
    const [privatePost, setPrivatePost] = useState(false);
    const { user, token } = useAuth();
    const addContent = async () => {
        const today = {
            content: editor?.getHTML(),
            img: "",
        };

        try {
            console.log(privatePost);

            if (today !== null) {
                const res = await axios({
                    method: "post",
                    url: "http://localhost:8080/api/v1/diaries",
                    data: {
                        today: today,
                        private: privatePost,
                    },
                    headers: {
                        userId: user,
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.status === 201) {
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
                <div className="relative lg:max-w-3xl mx-auto my-5 ">
                    <button
                        className="absolutemax-w-36 h-6  bg-black rounded-xl text-xs text-gray-200 text-center w-12"
                        onClick={addContent}
                    >
                        Add
                    </button>
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
    );
}
