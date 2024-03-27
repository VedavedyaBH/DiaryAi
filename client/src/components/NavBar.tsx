import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../Context/UserContext";
import { ButtonSmall } from "./ButtonSmall";
import { Header } from "./Hamburger";
import searchIcon from "../assets/searchIcon.png";

export function NavBar() {
    const navigate = useNavigate();
    const currentLoc = useLocation();
    const { token, _logout } = useAuth();

    return (
        <div className="bg-white lg:max-w item-center border-b text-gray-500 lg:text-lg flex flex-col lg:flex-row lg:p-2 justify-between mx-auto">
            <div className="flex text-xs lg:text-lg justify-evenly lg:ml-28 lg:justify-between items-center lg:mr-28 lg:flex-grow">
                <button
                    className=""
                    onClick={() => {
                        navigate("/feed");
                    }}
                >
                    DiaryAI
                </button>
                <div
                    onClick={() => navigate("/findPeople")}
                    className="lg:hidden"
                >
                    {" "}
                    <img className="h-5 lg:h-6" src={searchIcon}></img>{" "}
                </div>
                <Header></Header>{" "}
                <div className="hidden sm:flex flex-col lg:flex-row justify-center lg:justify-between items-center space-y-4 lg:space-y-0 lg:space-x-8 lg:w-auto lg:ml-10 lg:mr-10">
                    <div onClick={() => navigate("/findPeople")}>
                        <img className="h-5 lg:h-6" src={searchIcon}></img>{" "}
                    </div>
                    {token !== "" && (
                        <ButtonSmall
                            label={
                                currentLoc.pathname === "/today"
                                    ? "Diary"
                                    : currentLoc.pathname === "/user"
                                    ? "Logout"
                                    : "Add"
                            }
                            onClick={async () => {
                                if (currentLoc.pathname === "/today") {
                                    navigate("/myDiary");
                                } else if (currentLoc.pathname === "/user") {
                                    _logout();
                                } else {
                                    navigate("/today");
                                }
                            }}
                        />
                    )}
                    {!token && (
                        <ButtonSmall
                            label={
                                currentLoc.pathname === "/signup"
                                    ? "LogIn"
                                    : "SignUp"
                            }
                            onClick={() => {
                                navigate(
                                    currentLoc.pathname === "/signup"
                                        ? "/login"
                                        : "/signup"
                                );
                            }}
                        />
                    )}
                    {currentLoc.pathname != "/mydiary" && (
                        <ButtonSmall
                            label={"Diary"}
                            onClick={async () => {
                                navigate("/mydiary");
                            }}
                        />
                    )}
                    {token && (
                        <ButtonSmall
                            label="Profile"
                            onClick={() => {
                                navigate("/user");
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
