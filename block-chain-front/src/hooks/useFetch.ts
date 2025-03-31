import { unAuth } from "../services/index"
const useFetch = async <T>(url: string, options: RequestInit):Promise<T> => {
    const response = await fetch(url,{
            ...{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            ...options
    });
    if(!response.ok){
        throw new Error(response.statusText);
    }
   
    const json = await response.json();
    unAuth(json)
    return json
}

export {
    useFetch
}