import Swal from "sweetalert2";
import LS from "./LS";

type ValidMethods = "GET" | "POST" | "PUT" | "DELETE";

async function fetcher<T = any>(url: string, method: ValidMethods = "GET", rawData?: unknown, is_json: boolean = true) {
    const headers: HeadersInit = {};
    const options: RequestInit = {
        method,
        headers,
    };

    if (method === "POST" || method === "PUT") {
        if (is_json) {
            headers["Content-Type"] = "application/json";
            options.body = JSON.stringify(rawData);
        } else {
            options.body = rawData as FormData;
        }
    }

    const token = LS.token.get();

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return new Promise<T>(async (resolve) => {
        try {
            const res = await fetch(process.env.SERVER_URL + url, options);
            const data = await res.json();

            if (res.ok) {
                resolve(data);

                if (data.message) {
                    Swal.fire({
                        icon: "success",
                        title: data.title || "Nat 20!",
                        text: data.message,
                    });
                }
            } else {
                console.error(data);
                Swal.fire({
                    icon: "error",
                    title: data.title || "Nat 1!",
                    text: data.message,
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Nat 1!",
                text: (error as Error).message,
            });
        }
    });
}

export const GET = <T = any>(url: string) => fetcher<T>(url);
export const POST = <T = any>(url: string, data: unknown, is_json: boolean = true) => fetcher<T>(url, "POST", data, is_json);
export const PUT = <T = any>(url: string, data: unknown) => fetcher<T>(url, "PUT", data);
export const DELETE = <T = any>(url: string) => fetcher<T>(url, "DELETE");
