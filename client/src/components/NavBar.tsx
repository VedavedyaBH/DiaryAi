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
        <div>
            {" "}
            <div
                className="flex justify-around text-xs bg-neutral-800 p-4 h-14 shadow-sm item-center
    text-gray-100 mx-auto  lg:text-lg lg:h-16 lg:text-lg"
            >
                <div className="flex space-x-2">
                    <Bars3Icon
                        className="h-5 lg:h-8 pt-1 lg:pt-0"
                        onClick={toggleSideBar}
                    />
                    <button
                        className="lg:ml-14"
                        onClick={() => navigate("/feed")}
                    >
                        DiaryAI
                    </button>
                </div>

                <div className="" onClick={() => navigate("/findPeople")}>
                    <img
                        className="ml-44 h-5 lg:h-6"
                        src={searchIcon}
                        alt="search icon"
                    />
                </div>
            </div>
            <SideBar isOpen={isOpen} onClose={onClose} />
        </div>
    );
}
