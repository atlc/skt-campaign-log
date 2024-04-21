import React, { useState, useEffect } from "react";
import { GET } from "../services/fetcher";

const Profile = () => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        GET("/auth/profile").then(setProfile);
    }, []);

    return <h1 style={{ height: "2000px" }}>{JSON.stringify(profile)}</h1>;
};

export default Profile;
