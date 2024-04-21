import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./views/Login";
import Profile from "./views/Profile";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<h1>Home</h1>} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<h1 className="text-red">Ruh Roh</h1>} />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default App;
