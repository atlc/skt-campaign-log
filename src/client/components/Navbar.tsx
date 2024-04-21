import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LS from "../services/LS";

const Navbar = () => {
    const nav = useNavigate();
    const { pathname } = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasChecked, setHasChecked] = useState(false);

    const handle_logout = () => {
        LS.token.set("");
        nav("/login");
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const token = LS.token.get();

        if (!token) {
            setHasChecked(true);
            setIsLoggedIn(false);
            return;
        }

        fetch(process.env.SERVER_URL + "/auth/token_check", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setIsLoggedIn(res.ok);
            })
            .catch(() => setIsLoggedIn(false))
            .finally(() => setHasChecked(true));
    }, [pathname]);

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
