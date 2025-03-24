export default class Response {
    code: number;
    message: string;
    data: Object|string;
    constructor(code: number, message: string, data: any) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
    static success(data: Object) {
        return new Response(200, 'success', data);
    }
    static unauthorized(data: Object) {
        return new Response(401, 'unauthorized', data);
    }
    static fail(data: Object) {     
        return new Response(400, 'fail', data);
    }
    static error(data: Object) {
        return new Response(500, 'error', data);
    }
}