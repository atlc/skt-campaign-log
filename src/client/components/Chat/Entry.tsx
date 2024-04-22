import React, { useEffect, useState } from "react";
import { Log, User } from "../../types";
import LS from "../../services/LS";
import { DELETE } from "../../services/fetcher";

const Entry = ({ user_id, id, content, created_at, updated_at, user }: Log) => {
    const [isAuthor, setIsAuthor] = useState(false);

    useEffect(() => {
        const token = LS.token.get();

        if (token) {
            const [header, payload, sig] = token.split(".");
            const decoded = JSON.parse(atob(payload)) as User;
            if (decoded && "id" in decoded) {
                if (user_id === decoded.id) {
                    setIsAuthor(true);
                }
            }
        }
    }, []);

    const handle_delete = () => {
        DELETE(`/api/logs/${id}`);
    };

    return (
        <div className="row">
            <div className="col">
                <div className="log">
                    <img className="avatar" style={{ marginLeft: isAuthor ? "auto" : "" }} src={user.character_image_url || "/assets/favicon.png"} />
                    <p>{content}</p>
                    <p className="muted">
                        {updated_at ? `Last updated at ${new Date(updated_at).toLocaleString()}` : `Created at ${new Date(created_at).toLocaleString()}`}, by{" "}
                        {user.character_name}
                        {isAuthor && (
                            <span className="btn btn-normal" onClick={handle_delete}>
                                Delete
                            </span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Entry;
