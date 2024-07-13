import React, { useState } from "react";
import { POST } from "../../services/fetcher";

const CONTENT_MAX = 2048;

const Input = () => {
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handle_add_log = () => {
        if (!content) return;
        POST("/api/logs", { content }).then(() => setContent(""));
    };

    return (
        <div className="row">
            <div className="col">
                <textarea
                    className="chat"
                    rows={8}
                    cols={120}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={CONTENT_MAX}
                />
                <span
                    onClick={handle_add_log}
                    className="btn btn-normal"
                >
                    Add log entry
                </span>
                <label className="text-red bold xl">
                    {content.length}/{CONTENT_MAX}
                </label>
            </div>
        </div>
    );
};

export default Input;
