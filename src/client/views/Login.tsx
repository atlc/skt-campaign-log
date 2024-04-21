import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { POST } from "../services/fetcher";
import LS from "../services/LS";

interface FormItem {
    name: string;
    label: string;
    required: boolean;
    type: string;
    value: string;
    display_only_on_register?: boolean;
}

interface UpdateableFormItem extends FormItem {
    update: React.Dispatch<React.SetStateAction<FormItem>>;
}

const Login = () => {
    const [isLogin, setIsLogin] = useState(false);
    const nav = useNavigate();

    const [name, setName] = useState<FormItem>({
        name: "name",
        label: "Name",
        required: !isLogin,
        type: "text",
        value: "",
        display_only_on_register: true,
    });

    const [email, setEmail] = useState<FormItem>({
        name: "email",
        label: "Email",
        required: true,
        type: "email",
        value: "",
    });

    const [password, setPassword] = useState<FormItem>({
        name: "password",
        label: "Password",
        required: true,
        type: "password",
        value: "",
    });

    const [character_image_url, setCharacterImageURL] = useState<FormItem>({
        name: "character_image_url",
        label: "Upload an image of your character",
        required: false,
        type: "file",
        value: "",
        display_only_on_register: true,
    });

    const [character_name, setCharacterName] = useState<FormItem>({
        name: "character_name",
        label: `Character's Name`,
        required: true,
        type: "text",
        value: "",
        display_only_on_register: true,
    });

    const [character_url, setCharacterURL] = useState<FormItem>({
        name: `character_url`,
        label: "DNDBeyond link to your character",
        required: true,
        type: "text",
        value: "",
        display_only_on_register: true,
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const file = files[0];

        const data = new FormData();
        data.append("upload", file);

        const is_json = false;
        POST("/api/characters/upload", data, is_json).then(({ image_url }) =>
            setCharacterImageURL({
                ...character_image_url,
                value: image_url,
            })
        );
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const missing_credentials = !email.value || !password.value;
        const missing_registration = !name.value || !character_name.value || !character_url.value;

        if (isLogin && missing_credentials) {
            Swal.fire({
                icon: "error",
                title: "Nat 1!",
                text: "Missing login info (email & password)",
            });
            return;
        } else if (!isLogin && (missing_credentials || missing_registration)) {
            Swal.fire({
                icon: "error",
                title: "Nat 1!",
                text: "Missing registration info (name, email, password, character name, and character link are all required)",
            });
            return;
        }

        const URL = isLogin ? "/auth/login" : "/auth/register";
        const data = {
            name: name.value,
            email: email.value,
            password: password.value,
            character_image_url: character_image_url.value,
            character_name: character_name.value,
            character_url: character_url.value,
        };

        POST<{ message: string; title: string; token: string }>(URL, data).then(({ message, title, token }) => {
            if (token) {
                LS.token.set(token);
            }

            Swal.fire({ icon: "success", title, text: message });
            nav("/profile");
        });
    };

    return (
        <div className="row">
            <div className="col">
                <div className="form">
                    <h2>
                        {isLogin ? "Logging in" : "Registering"}. Need to{" "}
                        <span onClick={() => setIsLogin(!isLogin)} className="btn btn-normal">
                            {isLogin ? "register" : "login"}?
                        </span>
                    </h2>

                    {!isLogin && (
                        <div>
                            <label>Name:{name.required && <span className="text-red bold">*</span>}</label>
                            <input
                                type={name.type}
                                name={name.name}
                                value={name.value}
                                onChange={(e) => setName((prevStructure) => ({ ...prevStructure, value: e.target.value }))}
                            />
                        </div>
                    )}
                    <div>
                        <label>Email:{email.required && <span className="text-red bold">*</span>}</label>
                        <input
                            type={email.type}
                            name={email.name}
                            value={email.value}
                            onChange={(e) => setEmail((prevStructure) => ({ ...prevStructure, value: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label>Password:{password.required && <span className="text-red bold">*</span>}</label>
                        <input
                            type={password.type}
                            name={password.name}
                            value={password.value}
                            onChange={(e) => setPassword((prevStructure) => ({ ...prevStructure, value: e.target.value }))}
                        />
                    </div>
                    {!isLogin && (
                        <div>
                            <div>
                                <label>Upload an image of your character:</label>
                                <input type={character_image_url.type} name={character_image_url.name} onChange={handleImageUpload} />
                                {character_image_url.value && <img style={{ width: "25%" }} src={character_image_url.value} />}
                            </div>
                            <div>
                                <label>Character's Name:{character_name.required && <span className="text-red bold">*</span>}</label>
                                <input
                                    type={character_name.type}
                                    name={character_name.name}
                                    value={character_name.value}
                                    onChange={(e) => setCharacterName((prevStructure) => ({ ...prevStructure, value: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label>DNDBeyond link to your character:{character_url.required && <span className="text-red bold">*</span>}</label>
                                <input
                                    type={character_url.type}
                                    name={character_url.name}
                                    value={character_url.value}
                                    onChange={(e) => setCharacterURL((prevStructure) => ({ ...prevStructure, value: e.target.value }))}
                                />
                            </div>
                        </div>
                    )}
                    <h2>
                        <span onClick={handleSubmit} className="btn btn-normal">
                            Submit
                        </span>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Login;
