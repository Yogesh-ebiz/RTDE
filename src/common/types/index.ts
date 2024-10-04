
import { Request } from "express";
import { Query, Params } from 'express-serve-static-core';

export interface IReq<T> extends Request {
    body: T;
}

// @ts-ignore
export interface IReqQuery<T extends Query, P extends Params, U> extends e.Request {
    query: T;
    params: P;
    body: U;
}


export class R<T> {
    result?: T
    error?: string
    message?: string
    errorLevel?: number

    constructor(args: { result?: any, errorLevel?: number, error?: any, message?: string}) {
        this.result = args.result;
        this.message = args.message;

        if (args.error) {
            if (args.error in Error) {
                this.error = (args.error as Error).message
            }
            this.errorLevel = args.errorLevel ?? 100

        }
    }

    public get hasError() {
        return this.error != null;
    }
}

export default R;