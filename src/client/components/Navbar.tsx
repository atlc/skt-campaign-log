import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <Link className="nav-btn" to={"/"}>
                Home
            </Link>
            <Link className="nav-btn" to={"/profile"}>
                Profile
            </Link>
            <Link className="nav-btn" to={"/login"}>
                Login/Register
            </Link>
            <span className="nav-btn">Logout</span>
            <span className="nav-btn">Scroll to top</span>
        </nav>
    );
};

export default Navbar;
