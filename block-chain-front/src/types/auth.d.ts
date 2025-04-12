

interface LoginResponse extends Reponse {
    code: number;
    message: string;
    data: {
        [key: string]: string|number|Object
    }
}



interface registerResponse extends Reponse {
    code: number;
    message: string;
    data: Object
}

type User = {
    id: number;
    username: string;
    email: string|null;
    password: string;
    created_at: string|null;
    updated_at: string|null;
    [key: string]: any;
}