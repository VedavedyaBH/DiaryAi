import "./App.css";
import { Editor } from "./pages/ChapterEditor";
import { LogIn } from "./pages/LogIn";
import { NavBar } from "./components/NavBar";
import { SignUp } from "./pages/SignUp";
import { AuthProvider } from "./Context/UserContext";
import { Diaries } from "./pages/Diaries";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChapterCard from "./pages/Chapter";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import FindProfiles from "./pages/FindProfiles";
import { Home } from "./pages/Home";

function App() {
    return (
        <>
            <div className="flex-grow flex justify-center items-center">
                <main>
                    <AuthProvider>
                        <BrowserRouter>
                            <div className="w-screen item-center">
                                <NavBar />
                            </div>

                            <div className="grid lg:grid-cols-5">
                                <div
                                    className="pt-5 lg:col-span-1 lg:inline
                                duration-300 ease-in-out"
                                >
                                    {/* <SideBar /> */}
                                </div>

                                <div className="scrollable-feed lg:col-span-3">
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route
                                            path="/login"
                                            element={<LogIn />}
                                        />
                                        <Route
                                            path="/signup"
                                            element={<SignUp />}
                                        />
                                        <Route
                                            path="/myDiary"
                                            element={<Diaries />}
                                        />
                                        <Route
                                            path="/user"
                                            element={<Profile />}
                                        />
                                        <Route
                                            path="/today"
                                            element={<Editor />}
                                        />
                                        <Route
                                            path="/feed"
                                            element={<Feed />}
                                        />
                                        <Route
                                            path="/chapter/:chapterId"
                                            element={<ChapterCard />}
                                        />
                                        <Route
                                            path="/findPeople"
                                            element={<FindProfiles />}
                                        />
                                    </Routes>
                                </div>
                            </div>
                        </BrowserRouter>
                    </AuthProvider>
                </main>
            </div>
        </>
    );
}

export default App;
