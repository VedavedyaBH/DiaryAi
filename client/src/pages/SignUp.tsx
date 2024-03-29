import { useState, useEffect } from "react";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ButtonSmall } from "../components/ButtonSmall";

interface User {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export function SignUp() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [PasswordCheck, setPasswordCheck] = useState<string | null>("");

    useEffect(() => {
        if (user !== null) {
            addUser();
        }
    }, [user]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log("button cliked");
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
        }
    };

    async function addUser() {
        try {
            console.log("called");

            if (user !== null) {
                const url = `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/signup`;
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
                <div className="p-6 text-gray-100 bg-neutral-700 rounded-lg w-96">
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
                            type={"password"}
                            name={"password"}
                            placeholder={"Password"}
                        ></InputBox>
                        <InputBox
                            type={"password"}
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

                        <div className="pt-4 pb-4">
                            <ButtonSmall
                                type={"submit"}
                                label={"SignUp"}
                            ></ButtonSmall>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
