import { unAuth } from "../services/index"
const useFetch = async <T>(url: string, options: RequestInit): Promise<T> => {
    const { headers, body, method } = options;
    const response = await fetch(url, {
        method: method ?? 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(headers ?? {})
        },
        body: body,
    });
    if (!response.ok) {
        if (response.status === 401) {
            unAuth({ code: 401, message: 'Unauthorized', data: {} });
        }
        throw new Error(response.statusText);
    }

    return await response.json();
}

export {
    useFetch
}