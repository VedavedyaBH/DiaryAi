import { useEditor, EditorContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import { Button } from "./Button";
import { useCallback } from "react";

export function Editor() {
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
                        userId: "46116bc0-75d9-4fe1-b404-72b2fb855206",
                    },
                });

                if (res.status === 201) {
                    alert("today added");
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
            Image,
            Dropcursor,
            Placeholder.configure({
                placeholder: "How was your Day..?",
            }),
        ],
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
            },
        },
    });

    const addImage = useCallback(() => {
        const url = window.prompt("URL");

        if (url && editor !== null) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <>
            <div className="max-w-36 p-5 flex justify-center mx-auto ">
                <Button label={"Add"} onClick={addContent}></Button>
            </div>
            <div className="bg-white flex max-w-5xl p-5 justify-between mx-auto">
                <div className="flex rounded-lg  my-auto">
                    <div>
                        <EditorContent editor={editor}></EditorContent>
                    </div>
                </div>
            </div>
        </>
    );
}
