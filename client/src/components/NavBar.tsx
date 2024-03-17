import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../Context/UserContext";

export function NavBar() {
    const navigate = useNavigate();
    const currentLoc = useLocation();
    const { token, _logout } = useAuth();

    return (
        <div className="bg-white text-gray-500 text-lg flex max-w-3xl p-5 justify-between mx-auto">
            <div>
                <button
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    DiaryAI
                </button>
            </div>
            <div className="flex justify-between item-center">
                <div className="mr-4 bg-black rounded-xl text-xs text-gray-200 p-1 text-center w-12">
                    {token !== "" ? (
                        currentLoc.pathname === "/today" ? (
                            <button
                                onClick={async () => {
                                    navigate("/");
                                }}
                            >
                                Diary
                            </button>
                        ) : currentLoc.pathname !== "/today" ? (
                            <button
                                onClick={async () => {
                                    navigate("/today");
                                }}
                            >
                                Add
                            </button>
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
                    <div
                        onClick={() => {
                            _logout();
                        }}
                        className="mr-4 bg-black rounded-xl text-xs text-gray-200 p-1 text-center w-12"
                    >
                        Logout
                    </div>
                ) : null}
            </div>
        </div>
    );
}
