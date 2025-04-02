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
        if(response.status === 401){
            unAuth({code:401, message: 'Unauthorized', data: {}});
        }
        throw new Error(response.statusText); 
    }
    
   
    return await response.json();
}

export {
    useFetch
}