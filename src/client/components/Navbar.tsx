import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useCheckAuth from "../hooks/useCheckAuth";
import LS from "../services/LS";

const Navbar = () => {
    const nav = useNavigate();
    const { hasChecked, isLoggedIn } = useCheckAuth();

    const handle_logout = () => {
        LS.token.set("");
        nav("/login");
    };

    return (
        <nav>
            {hasChecked && isLoggedIn && (
                <Link className="nav-btn" to={"/"}>
                    Home
                </Link>
            )}
            {hasChecked && isLoggedIn && (
                <Link className="nav-btn" to={"/profile"}>
                    Profile
                </Link>
            )}
            {hasChecked && !isLoggedIn && (
                <Link className="nav-btn" to={"/login"}>
                    Login/Register
                </Link>
            )}
            {hasChecked && isLoggedIn && (
                <span onClick={handle_logout} className="nav-btn">
                    Logout
                </span>
            )}
            {/* <span className="nav-btn">Scroll to top</span> */}
        </nav>
    );
};

export default Navbar;
