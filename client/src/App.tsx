import "./App.css";
import { Button } from "./components/Button";
import { Editor } from "./components/Editor";
import { LogIn } from "./pages/LogIn";
import { NavBar } from "./components/NavBar";
import { SignUp } from "./pages/SignUp";
import { AuthProvider } from "./Context/UserContext";

function App() {
    const todayDate = new Date().toLocaleDateString();

    return (
        <>
            <div>
                {/* <NavBar></NavBar>

                <Editor></Editor> */}
                <AuthProvider>
                    <LogIn></LogIn>
                </AuthProvider>

                {/* <div>
                    <h1 className="text-gray-500 text-2xl p-5">
                        How was your day?
                    </h1>
                    <div className="">
                        <textarea
                            className="p-4 w-96 h-96 bg-gray-100 border border-gray-300 rounded resize-none"
                            placeholder="Share your thoughts"
                            maxLength={5000}
                        />
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default App;
