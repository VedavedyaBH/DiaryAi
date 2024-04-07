import { useState, useEffect } from "react";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { ButtonSmall } from "../components/ButtonSmall";
import { BottomWarning } from "../components/BottomWarning";

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
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string[]>
    >({});

    useEffect(() => {
        if (user !== null) {
            addUser();
        }
    }, [user]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (PasswordCheck !== formData.get("password"))
            alert("Password did not match");
        else {
            const isFormEmpty = Array.from(formData.values()).some(
                (value) => !value
            );

            if (isFormEmpty) {
                alert("Please fill all the details");
            } else if (PasswordCheck !== formData.get("password")) {
                alert("Password did not match");
            } else {
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
                console.log({ userFormData });

                setUser(userFormData);
            }
        }
    };

    async function addUser() {
        try {
            if (user !== null) {
                const url = `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/signup`;
                const res = await axios.post(url, { user });

                if (res.status === 201) {
                    navigate("/login");
                }
            }
        } catch (error: any) {
            handleErrorResponse(error);
        }
    }

    function handleErrorResponse(
        error: AxiosError<any>,
        formElement?: HTMLFormElement
    ) {
        if (!error.response) {
            alert("Network Error: Unable to connect to the server");
            return;
        }

        const responseData = error.response.data;

        if (error.response.status === 400) {
            if (responseData.name === "ZodError") {
                const errors: Record<string, string[]> = {};
                for (const issue of responseData.issues) {
                    const path = issue.path.join(".");
                    let errorMessage = issue.message;

                    if (path && errorMessage.includes("String must contain")) {
                        errorMessage = errorMessage.replace(
                            "String must contain",
                            `${path} needs to be of`
                        );
                    }
                    // gpt
                    if (path) {
                        errors[path] = errors[path]
                            ? [...errors[path], errorMessage]
                            : [errorMessage];
                    }
                }
                setValidationErrors(errors);
            } else if (responseData.error === "UsernameExists") {
                alert(
                    "Username already exists. Please choose a different username."
                );
            } else if (responseData.error === "EmailExists") {
                alert(
                    "Email address is already registered. Please use a different email."
                );
            } else {
                alert("Something went wrong");
            }

            if (formElement) {
                formElement.reset();
            }
        } else {
            alert("Server Error: Something went wrong");
        }
    }

    return (
        <>
            <div className="flex justify-center scale-75 lg:scale-100 lg:mt-36">
                <div className="p-6 text-gray-100 bg-neutral-700 rounded-lg w-96">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Heading label={"SignUp to DiaryAi"}></Heading>
                        </div>
                        <InputBox
                            name={"username"}
                            placeholder={"Username"}
                        ></InputBox>
                        {validationErrors.username && (
                            <div className="text-xs text-red-500">
                                {validationErrors.username.map((error) => (
                                    <div key={error}>{error}</div>
                                ))}
                            </div>
                        )}
                        <InputBox
                            name={"email"}
                            placeholder={"EmailId"}
                        ></InputBox>
                        {validationErrors.email && (
                            <div className="text-xs text-red-500">
                                {validationErrors.email.map((error) => (
                                    <div key={error}>{error}</div>
                                ))}
                            </div>
                        )}
                        <InputBox
                            name={"firstName"}
                            placeholder={"First Name"}
                        ></InputBox>
                        {validationErrors.firstName && (
                            <div className="text-xs text-red-500">
                                {validationErrors.firstName.map((error) => (
                                    <div key={error}>{error}</div>
                                ))}
                            </div>
                        )}
                        <InputBox
                            name={"lastName"}
                            placeholder={"Last Name"}
                        ></InputBox>
                        {validationErrors.lastName && (
                            <div className="text-xs text-red-500">
                                {validationErrors.lastName.map((error) => (
                                    <div key={error}>{error}</div>
                                ))}
                            </div>
                        )}
                        <InputBox
                            type={"password"}
                            name={"password"}
                            placeholder={"Password"}
                        ></InputBox>
                        {validationErrors.password && (
                            <div className="text-xs text-red-500">
                                {validationErrors.password.map((error) => (
                                    <div key={error}>{error}</div>
                                ))}
                            </div>
                        )}
                        <InputBox
                            type={"password"}
                            placeholder={"Re-enter the password"}
                            onChange={(e: any) => {
                                setPasswordCheck(e.target.value);
                            }}
                        ></InputBox>
                        <div className="pt-4 pb-4">
                            <ButtonSmall
                                type={"submit"}
                                label={"SignUp"}
                            ></ButtonSmall>
                            <BottomWarning
                                label={"Already a user? "}
                                buttonText={"Login"}
                                to={"/login"}
                            ></BottomWarning>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
