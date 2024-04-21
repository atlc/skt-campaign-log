import React from "react";
import { Navigate } from "react-router-dom";
import useCheckAuth from "../hooks/useCheckAuth";

const Home = () => {
    const { hasChecked, isLoggedIn } = useCheckAuth();

    if (!hasChecked) return <></>;
    if (hasChecked && !isLoggedIn) return <Navigate to={"/login"} />;

    return <h1>Home</h1>;
};

export default Home;
