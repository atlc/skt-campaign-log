import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <Link className="btn nav-btn" to={"/"}>
                Home
            </Link>
            <Link className="btn nav-btn" to={"/profile"}>
                Profile
            </Link>
            <Link className="btn nav-btn" to={"/login"}>
                Login/Register
            </Link>
            <span className="btn nav-btn">Logout</span>
            <span className="btn nav-btn">Scroll to top</span>
        </nav>
    );
};

export default Navbar;
