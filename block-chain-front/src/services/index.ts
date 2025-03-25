const useFetch = async (url: string, options: RequestInit = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

export {
    useFetch
}