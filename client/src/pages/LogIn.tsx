import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/UserContext";

interface User {
    username?: string;
    email?: string;
    password: string;
}

export function LogIn() {
    const navigate = useNavigate();
    const { _login } = useAuth();
    const [user, setUser] = useState<User | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const userFormData: User = {
            username: formData.get("usernameOrEmail") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };

        setUser(userFormData);
        await addUser();
    };

    async function addUser() {
        try {
            if (user !== null) {
                const url = "http://localhost:8080/user/v1/login";
                const res = await axios.post(url, { user });
                if (res.status === 200) {
                    const token = res.data;
                    await _login({ token });
                    navigate("/");
                }
            }
        } catch (error: any) {
            console.log(error.message);
            if (error.response && error.response.status === 400) {
                if (
                    error.response.data.includes("Username") ||
                    error.response.data.includes("Password")
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
            <div className="flex justify-center h-screen mt-36">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-2 rounded-lg w-96">
                        <div className="">
                            <Heading label={"Login to DiaryAi"}></Heading>
                        </div>
                        <InputBox
                            name={"usernameOrEmail"}
                            placeholder={"Username or EmailId"}
                        ></InputBox>
                        <InputBox
                            name={"password"}
                            placeholder={"Password"}
                        ></InputBox>
                        <div className="pt-4">
                            <Button type={"submit"} label={"Login"}></Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
