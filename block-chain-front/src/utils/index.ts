const setLocal = (key: string, value: string | number | Object): void => {
    switch (typeof value) {
        case 'object':
            localStorage.setItem(key, JSON.stringify(value))
            break;
        case 'number':
            localStorage.setItem(key, JSON.stringify(value))
            break;
        default:
            localStorage.setItem(key, value)
            break;
    }
}

const getLocal = (key: string): string | Object | null => {
    if (localStorage.getItem(key) && localStorage.getItem(key) != null) {
        return JSON.parse(localStorage.getItem(key) as string)
    } else {
        return null
    }
}
const getToken = (key: string = "token"): string | null => {
    if (localStorage.getItem(key) && localStorage.getItem(key) != null) {
        return localStorage.getItem(key) as string
    } else {
        return null
    }
}

const rmLocal = (key: string): void => {
    localStorage.removeItem(key)
}
const setSession = (key: string, value: string | number | Object): void => {
    sessionStorage.setItem(key, JSON.stringify(value))
}

const getSession = (key: string): string | Object | null => {
    if (sessionStorage.getItem(key) && sessionStorage.getItem(key) != null) {
        return JSON.parse(sessionStorage.getItem(key) as string)
    } else {
        return null
    }
}
const rmSession = (key: string): void => {
    sessionStorage.removeItem(key)
}


export {
    setLocal,
    getLocal,
    rmLocal,
    setSession,
    getSession,
    rmSession,
    getToken
}