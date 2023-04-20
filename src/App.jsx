import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Home from "./pages/home.jsx";

function App() {

  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Login/>}
                    />

                <Route
                    path={"/register"}
                    element={<Register/>}
                    />

                <Route
                    path={"/home"}
                    element={<Home/>}
                    />

            </Routes>
        </BrowserRouter>

    </div>
  )
}

export default App
