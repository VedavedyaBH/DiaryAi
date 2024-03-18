import React from "react";
import { useAuth } from "../Context/UserContext";
import axios from "axios";
import { useState, useEffect } from "react";
import { InputBox } from "../components/InputBox";
import { useNavigate } from "react-router-dom";

interface User {
    username: string;
    password: string;
    reenteredPassword: string;
    email: string;
}

function Profile() {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [userObj, setUserObj] = useState<any>("");
    const [updatedUserObj, setUpdatedUserObj] = useState<User>({
        username: "",
        password: "",
        reenteredPassword: "",
        email: "",
    });

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/user/v1/${user}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = res.data;
            setUserObj(data);
        } catch (error: any) {
            console.log(error.message);
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedUserObj((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const updateUser = async () => {
        try {
            console.log(updatedUserObj);
            const res = await axios.put(
                `  http://localhost:8080/user/v1/user/update `,
                { user: updatedUserObj },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: user,
                    },
                }
            );
            const data = await res.data;
            setUserObj(data);
            window.location.reload();
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <>
            {" "}
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
                <div className="mt-6">
                    <div className="max-w-3xl mx-auto bg-white pt-5 rounded-md">
                        <div className="text-4xl font-bold">{`Hello ${userObj.username}!`}</div>
                        <form>
                            <div className="mb-4 my-10 max-w-72">
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Username
                                </label>
                                <InputBox
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={updatedUserObj.username}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-400"
                                    placeholder={userObj.username}
                                />
                            </div>
                            <div className="mb-4 max-w-72">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <InputBox
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={updatedUserObj.password}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-400"
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div className="mb-4 max-w-72">
                                <label
                                    htmlFor="reenteredPassword"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Re-Enter the Password
                                </label>
                                <InputBox
                                    id="reenteredPassword"
                                    type="password"
                                    name="reenteredPassword"
                                    value={updatedUserObj.reenteredPassword}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-400"
                                    placeholder="Re-Enter the Password"
                                />
                            </div>
                            <div className="mb-4 max-w-72">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <InputBox
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={updatedUserObj.email}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-400"
                                    placeholder={userObj.email}
                                />
                            </div>

                            <button
                                onClick={updateUser}
                                type="button"
                                className="bg-black rounded-xl text-xs text-gray-200 p-1 text-center w-24 h-8"
                            >
                                Update Profile
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Profile;