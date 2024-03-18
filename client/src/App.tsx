import "./App.css";
import { Editor } from "./pages/ChapterEditor";
import { LogIn } from "./pages/LogIn";
import { NavBar } from "./components/NavBar";
import { SignUp } from "./pages/SignUp";
import { AuthProvider } from "./Context/UserContext";
import { Diaries } from "./pages/Diaries";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChapterCard from "./pages/ChapterCard";
import Profile from "./pages/Profile";

function App() {
    return (
        <>
            <div>
                <main>
                    <AuthProvider>
                        <BrowserRouter>
                            <NavBar></NavBar>
                            <Routes>
                                <Route path="/login" element={<LogIn />} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route path="/" element={<Diaries />} />
                                <Route path="/today" element={<Editor />} />
                                <Route
                                    path="/chapter/:chapterId"
                                    element={<ChapterCard />}
                                />
                                <Route path="/user" element={<Profile />} />
                            </Routes>
                        </BrowserRouter>
                    </AuthProvider>
                </main>
            </div>
        </>
    );
}

export default App;
