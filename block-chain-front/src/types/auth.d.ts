

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