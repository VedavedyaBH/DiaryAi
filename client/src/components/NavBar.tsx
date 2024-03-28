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
        <div
            className="flex text-xs bg-sky-50 border-b p-4 h-14
        shadow-sm item-center text-gray-500
        justify-between mx-auto
        lg:justify-between lg:text-lg lg:h-16
        lg:text-lg"
        >
            <button
                className="lg:ml-14"
                onClick={() => {
                    navigate("/feed");
                }}
            >
                DiaryAI
            </button>
            <div
                onClick={() => navigate("/findPeople")}
                className="lg:hidden item-center"
            >
                <img className="ml-3 h-5 lg:h-6" src={searchIcon}></img>
            </div>
            <div className="lg:hidden item-center h-14">
                <Header></Header>
            </div>

            <div className="hidden sm:flex flex-col lg:flex-row justify-center lg:justify-between items-center space-y-4 lg:space-y-0 lg:space-x-8 lg:w-auto lg:ml-10 lg:mr-10">
                <div onClick={() => navigate("/findPeople")}>
                    <img className="h-5 lg:h-6" src={searchIcon}></img>{" "}
                </div>
                {token !== "" && (
                    <ButtonSmall
                        label={
                            currentLoc.pathname === "/today"
                                ? "Diary"
                                : currentLoc.pathname === "/feed"
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
    );
}
