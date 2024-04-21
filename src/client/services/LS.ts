const TOKEN_KEY = "token";
const VISITED_KEY = "has_visited";

const token = {
    get: () => localStorage.getItem(TOKEN_KEY),
    set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
};

const has_visited = {
    get: () => localStorage.getItem(VISITED_KEY),
    set: (bool: boolean) => localStorage.setItem(VISITED_KEY, JSON.stringify(bool)),
};

export default {
    token,
    has_visited,
};
