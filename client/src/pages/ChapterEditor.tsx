import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import { useAuth } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

export function Editor() {
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const addContent = async () => {
        const today = {
            content: editor?.getHTML(),
            img: "",
        };

        try {
            if (today !== null) {
                const res = await axios({
                    method: "post",
                    url: "http://localhost:8080/user/v1/today",
                    data: {
                        today: today,
                    },
                    headers: {
                        userId: user,
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.status === 201) {
                    navigate("/");
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
            <div className="relative lg:max-w-3xl mx-auto my-5 ">
                <button
                    className="absolutemax-w-36 h-6  bg-black rounded-xl text-xs text-gray-200 text-center w-12"
                    onClick={addContent}
                >
                    Add
                </button>
                <div>
                    <EditorContent editor={editor}></EditorContent>
                </div>
            </div>
        </>
    );
}
