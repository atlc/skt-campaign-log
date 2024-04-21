import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<h1>Home</h1>} />
                    <Route path="/profile" element={<h1 style={{ height: "2000px" }}>Profile</h1>} />
                    <Route path="/login" element={<h1>Login/Register</h1>} />
                    <Route path="*" element={<h1 className="text-red">Ruh Roh</h1>} />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default App;
