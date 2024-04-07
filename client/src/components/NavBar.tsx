import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/searchIcon.png";
import SideBar from "./SideBar";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function NavBar() {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const toggleSideBar = () => {
        setIsOpen(!isOpen);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    return (
        <div className="w-screen fixed top-0 z-10 bg-neutral-800">
            <div className="max-w-7xl mx-auto">
                <div
                    className="flex justify-around text-xs p-4 h-14 shadow-sm item-center
                           text-gray-100 mx-auto  lg:text-lg lg:h-16 lg:text-lg"
                >
                    <div className="flex space-x-2">
                        <Bars3Icon
                            className="h-5 lg:h-8 pt-1 lg:pt-0"
                            onClick={toggleSideBar}
                        />
                        <button
                            className="lg:ml-14"
                            onClick={() => navigate("/")}
                        >
                            DiaryAI
                        </button>
                    </div>
                    <div onClick={() => navigate("/findPeople")}>
                        <img
                            className="ml-44 hover:scale-110 duration-300 ease-in-out h-5 pt-1 lg:h-7"
                            src={searchIcon}
                            alt="search icon"
                        />
                    </div>
                </div>
                <SideBar isOpen={isOpen} onClose={onClose} />
            </div>
        </div>
    );
}
