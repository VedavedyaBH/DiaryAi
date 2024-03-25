import { useState } from "react";

export function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <div className="flex items-center justify-between border-b border-gray-400 py-8">
            <nav>
                <section className="flex md:hidden lg:hidden">
                    <div
                        className="HAMBURGER-ICON space-y-2"
                        onClick={() => setIsNavOpen((prev) => !prev)}
                    >
                        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                    </div>

                    <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                        <div
                            className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
                            onClick={() => setIsNavOpen(false)}
                        >
                            <svg
                                className="h-8 w-8 text-gray-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </div>

                        <div className="flex flex-col text-md items-center justify-between">
                            {localStorage.getItem("userId") !== null &&
                            localStorage.getItem("token") !== null ? (
                                <div className="flex flex-col text-md items-center justify-between">
                                    <button className="border-b border-gray-400 my-8">
                                        <a href="/feed" className="nav-link">
                                            Feeds
                                        </a>
                                    </button>
                                    <button className="border-b border-gray-400 my-8">
                                        <a href="/user" className="nav-link">
                                            Profile
                                        </a>
                                    </button>
                                    <button className="border-b border-gray-400 my-8">
                                        <a href="/today" className="nav-link">
                                            Add a Chapter
                                        </a>
                                    </button>
                                    <button className="border-b border-gray-400 my-8">
                                        <a href="/myDiary" className="nav-link">
                                            MyDiary
                                        </a>
                                    </button>{" "}
                                </div>
                            ) : null}
                            {localStorage.getItem("userId") !== null ? (
                                <button
                                    onClick={() => {
                                        localStorage.removeItem("userId");
                                        localStorage.removeItem("token");
                                    }}
                                    className="border-b border-gray-400 my-8"
                                >
                                    <a href="/" className="nav-link">
                                        Logout
                                    </a>
                                </button>
                            ) : (
                                <div className="flex flex-col text-md items-center justify-between">
                                    <button className="border-b border-gray-400 my-8">
                                        <a href="/login" className="nav-link">
                                            Login
                                        </a>
                                    </button>
                                    <button className="border-b border-gray-400 my-8">
                                        <a href="/signup" className="nav-link">
                                            Signup
                                        </a>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </nav>
            <style>{`
                .hideMenuNav {
                    display: none;
                }
                .showMenuNav {
                    display: block;
                    position: absolute;
                    width: 100%;
                    height: 100vh;
                    top: 0;
                    left: 0;
                    background: white;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                }
               
            `}</style>
        </div>
    );
}
