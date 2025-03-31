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
    return await response.json();

}

export {
    useFetch
}