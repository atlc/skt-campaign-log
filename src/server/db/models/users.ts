export interface BaseUser {
    name: string;
    email: string;
    password: string;
    character_name: string;
    character_url: string;
    character_image_url?: string;
}

export interface User extends BaseUser {
    id: string;
    created_at: string;
    updated_at: string;
}

export interface Payload {
    id: string;
    name: string;
    character_name: string;
}
