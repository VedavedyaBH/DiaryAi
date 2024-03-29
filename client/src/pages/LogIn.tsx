import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/UserContext";
import { ButtonSmall } from "../components/ButtonSmall";

interface User {
    username?: string;
    email?: string;
    password: string;
}

export function LogIn() {
    const navigate = useNavigate();
    const { _login } = useAuth();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const emailCheck = formData.get("usernameOrEmail") as string;
        const isEmail = emailCheck.includes("@") ? true : false;
        let userFormData: User;

        if (isEmail) {
            userFormData = {
                email: formData.get("usernameOrEmail") as string,
                password: formData.get("password") as string,
            };
        } else {
            userFormData = {
                username: formData.get("usernameOrEmail") as string,
                password: formData.get("password") as string,
            };
        }
        addUser(userFormData);
    };

    async function addUser(user: User) {
        try {
            if (user !== null) {
                const url = `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/login`;
                const res = await axios.post(url, { user });
                if (res.status === 200) {
                    const token = res.data;
                    navigate("/feed");
                    await _login({ token });
                    navigate("/feed");
                    window.location.reload();
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
                    <div className="p-6 text-gray-100 bg-neutral-700 rounded-lg w-96">
                        <div className="">
                            <Heading label={"Login to DiaryAi"}></Heading>
                        </div>
                        <InputBox
                            name={"usernameOrEmail"}
                            placeholder={"Username or EmailId"}
                        ></InputBox>
                        <InputBox
                            type={"password"}
                            name={"password"}
                            placeholder={"Password"}
                        ></InputBox>
                        <div className="pt-4 pb-4">
                            <ButtonSmall type={"submit"} label={"Login"}></ButtonSmall  >
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
