export interface BaseLog {
    user_id: string;
    content: string;
}

export interface Log extends BaseLog {
    id: string;
    created_at: string;
    updated_at: string;
}
