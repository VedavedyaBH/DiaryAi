import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../Context/UserContext";
import SearchBar from "./SearchBar";

export function NavBar() {
    const navigate = useNavigate();
    const currentLoc = useLocation();
    const { token, _logout } = useAuth();

    return (
        <div className="bg-white border-b text-gray-500 text-lg flex max-w-3xl p-2 justify-between mx-auto">
            <div className="flex justify-between item-center">
                <button
                    onClick={() => {
                        navigate("/feed");
                    }}
                >
                    DiaryAI
                </button>
            </div>
            <div className="flex justify-between item-center">
                <div>
                    <SearchBar></SearchBar>
                </div>
                <div className="m-4 bg-black rounded-xl text-xs text-gray-200 p-1 text-center w-12">
                    {token !== "" ? (
                        currentLoc.pathname === "/today" ? (
                            <button
                                onClick={async () => {
                                    navigate("/myDiary");
                                }}
                            >
                                Diary
                            </button>
                        ) : currentLoc.pathname !== "/chapter/:chapterId" ? (
                            currentLoc.pathname === "/user" ? (
                                <button
                                    onClick={async () => {
                                        _logout();
                                    }}
                                >
                                    logout
                                </button>
                            ) : (
                                <button
                                    onClick={async () => {
                                        navigate("/today");
                                    }}
                                >
                                    Add
                                </button>
                            )
                        ) : null
                    ) : currentLoc.pathname === "/signup" ? (
                        <button
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            LogIn
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                navigate("/signup");
                            }}
                        >
                            SignUp
                        </button>
                    )}
                </div>
                {token !== "" ? (
                    <button
                        onClick={() => {
                            navigate("/user");
                        }}
                        className="m-4 bg-black rounded-xl text-xs text-gray-200 p-1 text-center w-12"
                    >
                        Profile
                    </button>
                ) : null}
            </div>
        </div>
    );
}
