import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export function SignUp() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [PasswordCheck, setPasswordCheck] = useState<string | null>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (PasswordCheck !== formData.get("password"))
            alert("Password did not match");
        else {
            const userFormData: User = {
                username: formData.get("username") as string,
                email: formData.get("email") as string,
                firstName: formData.get("firstName") as string,
                lastName: formData.get("lastName") as string,
                password: formData.get("password") as string,
                // dob: formData.get("dob") as string,
                // mob: formData.get("mob") as string,
                // yob: formData.get("yob") as string,
            };

            setUser(userFormData);
            await addUser();
        }
    };

    async function addUser() {
        try {
            if (user !== null) {
                const url = `${BASE_URL}/api/v1/signup`;
                const res = await axios.post(url, { user });

                if (res.status === 201) {
                    navigate("/login");
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

    return (
        <>
            <div className="flex justify-center mt-24">
                <div className="p-6 border-2 rounded-lg w-96">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Heading label={"SignUp to DiaryAi"}></Heading>
                        </div>
                        <InputBox
                            name={"username"}
                            placeholder={"Username"}
                        ></InputBox>
                        <InputBox
                            name={"email"}
                            placeholder={"EmailId"}
                        ></InputBox>
                        <InputBox
                            name={"firstName"}
                            placeholder={"First Name"}
                        ></InputBox>
                        <InputBox
                            name={"lastName"}
                            placeholder={"Last Name"}
                        ></InputBox>
                        <InputBox
                            name={"password"}
                            placeholder={"Password"}
                        ></InputBox>
                        <InputBox
                            placeholder={"Re-enter the password"}
                            onChange={(e: any) => {
                                setPasswordCheck(e.target.value);
                            }}
                        ></InputBox>
                        {/* <div className="pt-2 flex items-center justify-between">
                            <InputBox
                                name={"dob"}
                                type="text"
                                placeholder="DD (Date)"
                                className="w-16 px-3 py-2 border border-gray-300 rounded-md focus:outline-none flex items-center justify-center"
                            />

                            <div className="mx-2">
                                <InputBox
                                    name={"mob"}
                                    type="text"
                                    placeholder="MM (of)"
                                    className="w-16 px-3 py-2 border border-gray-300 rounded-md focus:outline-none flex items-center justify-center"
                                />
                            </div>

                            <InputBox
                                name={"yob"}
                                type="text"
                                placeholder="YYYY (birth)"
                                className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none flex items-center justify-center"
                            />
                        </div> */}

                        <div className="pt-4">
                            <Button type={"submit"} label={"SignUp"}></Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
