import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const NavBar = () => {
    // const navigate = useNavigate();

    return (
        <div className="bg-white text-gray-500 flex max-w-5xl p-5 justify-between mx-auto">
            <div>
                <button>DiaryAI</button>
            </div>
            <div className="flex justify-between">
                <div className="mr-4 bg-black rounded-xl text-xs text-gray-200 p-1 text-center w-12">
                    <button>Post</button>
                </div>
                <div className="mr-4 bg-black rounded-xl text-xs text-gray-200 p-1 text-center w-12">
                    Profile
                </div>
            </div>
        </div>
    );
};
