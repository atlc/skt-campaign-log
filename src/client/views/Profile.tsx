import React, { useState, useEffect } from "react";
import Iframe from "react-iframe";
import { GET, POST, PUT } from "../services/fetcher";
import { User } from "../types";

const Profile = () => {
    const [profile, setProfile] = useState<User>();

    const load_profile = () => GET("/auth/profile").then(setProfile);

    useEffect(() => {
        load_profile();
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const file = files[0];

        const data = new FormData();
        data.append("upload", file);

        const is_json = false;
        POST<{ image_url: string }>("/api/characters/upload", data, is_json).then(({ image_url }) => {
            PUT("/api/characters", { character_image_url: image_url }).then(load_profile);
        });
    };

    return (
        <div>
            <div className="row" style={{ display: "block" }}>
                <div className="col">
                    <div className="form">
                        <label>
                            {profile?.character_image_url ? "Want a new pic for " : "No picture yet for "}
                            {profile?.character_name}? Upload one below!
                        </label>
                        <input type="file" onChange={handleImageUpload} />
                    </div>
                    {profile?.character_image_url && <img src={profile.character_image_url} />}
                </div>
            </div>
            <div style={{ display: "block" }}>
                <div className="col">{profile?.character_url && <Iframe url={profile.character_url} width="90%" height="100%" position="fixed" />}</div>
            </div>
        </div>
    );
};

export default Profile;
