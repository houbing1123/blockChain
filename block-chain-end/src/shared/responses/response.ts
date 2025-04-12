import { User } from "src/db/entities/user.entity";

type dataType = {[key: string]: any} | User | null

export default class Response {
    code: number;
    message: string;
    data: dataType;
    constructor(code: number, message: string, data: any) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
    static success(data: dataType) {
        return new Response(200, 'success', data);
    }
    static unauthorized(data: dataType) {
        return new Response(401, 'unauthorized', data);
    }
    static fail(data: string) {     
        return new Response(400, 'fail', data);
    }
    static error(data: dataType) {
        return new Response(500, 'error', data);
    }
}