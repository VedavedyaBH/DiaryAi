import React from "react";
import { useAuth } from "../Context/UserContext";
import axios from "axios";
import { useState, useEffect } from "react";
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
    const [changePassword, setChangePassword] = useState(false);
    const [diaries, setDiaries] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [diariesCount, setDiariesCount] = useState(0);

    const [updatedUserObj, setUpdatedUserObj] = useState<User>({
        username: "",
        password: "",
        reenteredPassword: "",
        email: "",
    });

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        setDiariesCount(diaries.length);
        setFollowersCount(followers.length);
        setFollowingCount(following.length);
    }, [diaries, followers, following]);

    const fetchUser = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/socials/profile/${user}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = res.data;
            setUserObj(data);
            setIsLoading(false);
            setDiaries(data.diaries);
            setFollowers(data.socials.followers);
            setFollowing(data.socials.following);
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
                `${process.env.REACT_APP_SERVER_BASE_URL}/api/v1/users/profile`,
                { user: updatedUserObj },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
            ) : isLoading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="lg:mt-6 lg:max-w-3xl mx-auto bg-white lg:p-6 rounded-md">
                    <div className="flex flex-col lg:flex-row justify-around items-center lg:p-4">
                        <div>
                            <div className="lg:hidden justify-center items-center mt-12 text-center lg:mt-0">
                                <div className="hidden text-center sm:hidden lg:inline-block lg:border lg:w-48 lg:h-48 "></div>
                                <div className="mt-4 text-2xl font-bold">{`Hello ${userObj.username}!`}</div>
                            </div>
                            <div className="mt-5 mb-5 flex flex-col lg:flex-row justify-between items-center">
                                <div className="flex justify-center lg:justify-start">
                                    <div className="mr-5 text-lg text-sm">
                                        <div>Chapters</div>
                                        <div className="text-center lg:text-center text-2xl mt-2">
                                            {diariesCount}
                                        </div>
                                    </div>
                                    <div className="mr-5 text-lg text-sm">
                                        <div>Followers</div>
                                        <div className="text-center lg:text-center text-2xl mt-2">
                                            {followersCount}
                                        </div>
                                    </div>
                                    <div className="mr-5 text-lg text-sm">
                                        <div>Following</div>
                                        <div className="text-center lg:text-center text-2xl mt-2">
                                            {followingCount}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form className="mt-4 lg:mt-0">
                                <div className="mb-4 my-10 max-w-72">
                                    <label
                                        htmlFor="username"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        name="username"
                                        value={updatedUserObj.username}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border-b border-gray-300 rounded-md w-full focus:outline-none"
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
                                    <input
                                        onClick={() => {
                                            changePassword
                                                ? setChangePassword(false)
                                                : setChangePassword(true);
                                        }}
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={updatedUserObj.password}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border-b border-gray-300 rounded-md w-full focus:outline-none"
                                        placeholder="Enter new password"
                                    />
                                </div>
                                {changePassword ? (
                                    <div className="mb-4 max-w-72">
                                        <label
                                            htmlFor="reenteredPassword"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Re-Enter the Password
                                        </label>
                                        <input
                                            id="reenteredPassword"
                                            type="password"
                                            name="reenteredPassword"
                                            value={
                                                updatedUserObj.reenteredPassword
                                            }
                                            onChange={handleInputChange}
                                            className="mt-1 p-2 border-b border-gray-300 rounded-md w-full focus:outline-none"
                                            placeholder="Re-Enter the Password"
                                        />
                                    </div>
                                ) : null}
                                <div className="mb-4 max-w-72">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={updatedUserObj.email}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border-b border-gray-300 rounded-md w-full focus:outline-none"
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
                        <div className="justify-center items-center mt-12 text-center lg:mt-0">
                            <div className="hidden sm:hidden lg:inline-block lg:border lg:w-48 lg:h-48 "></div>
                            <div className="hidden sm:flex ml-2 mt-4 text-4xl font-bold">{`Hello ${userObj.username}!`}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Profile;
