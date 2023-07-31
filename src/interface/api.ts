export type ResponseBody<T> = {
    message : string;
    code : number;
    data : T;
}