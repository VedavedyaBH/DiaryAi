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
import ProfileCard from "./components/ProfileCard";
import { Home } from "./pages/Home";

function App() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <div className="item-center">
                        <NavBar />
                    </div>
                    <main>
                        <div className="pt-12 mt-5 scrollable">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<LogIn />} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route path="/myDiary" element={<Diaries />} />
                                <Route path="/user" element={<Profile />} />
                                <Route path="/today" element={<Editor />} />
                                <Route path="/feed" element={<Feed />} />
                                <Route
                                    path="/chapter/:chapterId"
                                    element={<ChapterCard />}
                                />
                                <Route
                                    path="/profile/:userId"
                                    element={<ProfileCard />}
                                />
                                <Route
                                    path="/findPeople"
                                    element={<FindProfiles />}
                                />
                            </Routes>
                        </div>
                    </main>
                </AuthProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
