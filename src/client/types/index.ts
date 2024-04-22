export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    character_name: string;
    character_url: string;
    character_image_url?: string;
    created_at: string;
    updated_at: string;
}

export interface Log {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
    updated_at: string;
    user: {
        id: string;
        name: string;
        character_name: string;
        character_url: string;
        character_image_url?: string;
        created_at: string;
        updated_at: string;
    };
}
