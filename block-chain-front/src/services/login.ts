import { useFetch } from "../hooks/useFetch";

export const requestLogin = async (username: string, password: string):Promise<LoginResponse> => {
    return await useFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        })
    });
}

export const requestRegister = async (username: string, password: string,email:string):Promise<LoginResponse> => {
    return await useFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password,
            email,
        })
    });
}