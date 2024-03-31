import {
    UserIcon,
    RectangleStackIcon,
    PlusIcon,
    ClipboardDocumentListIcon,
    ArrowLeftEndOnRectangleIcon,
    ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import SideBarRow from "./SideBarRow";

function SideBar({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { _logout } = useAuth();

    return (
        <div>
            {!token ? (
                <div>
                    <div
                        className={`sidebar-container ${isOpen ? "open" : ""}`}
                    >
                        <div
                            onClick={() => {
                                onClose();
                            }}
                            className="flex justify-end pt-5 scale-75"
                        >
                            <SideBarRow title={""} Icon={ArrowLeftIcon} />
                        </div>
                        <div className="rounded-lg p-4">
                            <div>
                                <div
                                    onClick={() => {
                                        navigate("/login");
                                        onClose();
                                    }}
                                >
                                    <SideBarRow
                                        title={"Log     In"}
                                        Icon={UserIcon}
                                    />
                                </div>
                                <div
                                    onClick={() => {
                                        navigate("/signup");
                                        onClose();
                                    }}
                                >
                                    <SideBarRow
                                        title={"Sign Up"}
                                        Icon={PlusIcon}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
                    <div
                        onClick={() => {
                            onClose();
                        }}
                        className="flex justify-end pt-5 scale-75"
                    >
                        <SideBarRow title={""} Icon={ArrowLeftIcon} />
                    </div>
                    <div className="rounded-lg p-4">
                        <div>
                            <div
                                onClick={() => {
                                    navigate("/user");
                                    onClose();
                                }}
                            >
                                <SideBarRow title={"Profile"} Icon={UserIcon} />
                            </div>
                            <div
                                onClick={() => {
                                    navigate("/today");
                                    onClose();
                                }}
                            >
                                <SideBarRow title={"Add"} Icon={PlusIcon} />
                            </div>
                            <div
                                onClick={() => {
                                    navigate("/myDiary");
                                    onClose();
                                }}
                            >
                                <SideBarRow
                                    title={"My Diary"}
                                    Icon={RectangleStackIcon}
                                />
                            </div>
                            <div
                                onClick={() => {
                                    navigate("/feed");
                                    onClose();
                                }}
                            >
                                <SideBarRow
                                    title={"Feed"}
                                    Icon={ClipboardDocumentListIcon}
                                />
                            </div>
                            <div
                                onClick={() => {
                                    _logout();
                                    onClose();
                                }}
                            >
                                <SideBarRow
                                    title={"Log Out"}
                                    Icon={ArrowLeftEndOnRectangleIcon}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SideBar;
