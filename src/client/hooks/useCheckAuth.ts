import { useEffect, useState } from "react";

const useCheckAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasChecked, setHasChecked] = useState(false);

    useEffect(() => {
        fetch(process.env.SERVER_URL + "/auth/token_check")
            .then((res) => setIsLoggedIn(res.ok))
            .catch(() => setIsLoggedIn(false))
            .finally(() => setHasChecked(true));
    }, []);

    return { hasChecked, isLoggedIn };
};

export default useCheckAuth;
