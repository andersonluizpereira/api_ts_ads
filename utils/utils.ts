import UserSchema from "../models/userSchema";
import * as Jwt from "jsonwebtoken";

export const normalizePort = (val: number | string): number => {
    return (typeof val === 'string') ? parseInt(val) : val;
}

export const generatedToken = (email: String, name: String ): String => {
    let payload = {
        iss: "omundoedos.net",
        iat: new Date().getSeconds(),
        exp: new Date().setMinutes(60),
        name: name,
        email: email
    };
    return Jwt.sign(payload, JWT_SECRET);
}

export const onError = (port: Number) => {
    return (error: NodeJS.ErrnoException): void => {
        if (error.syscall !== 'listen') throw error;
        let bind = (typeof port === 'string') ? `pipe ${port}` : `port ${port}`;
        switch(error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}

export const onListening = (address: String, port: Number) => {
    return (): void => {
        console.log(`Listening at server http://${address}:${port}...`);
    }
}

export const handleError = (error: Error) => {
    let errorMessage: string = `${error.name}: ${error.message}`;
    let env: string = process.env.NODE_ENV;
    if (env !== 'test' && env !== 'pipelines') { console.log(errorMessage); }
    return Promise.reject(new Error(errorMessage));
};

export const throwError = (condition: boolean, message: string): void => {
    if (condition) { throw new Error(message); }
};

export const JWT_SECRET: string = process.env.JWT_SECRET;
export const URL_BASE: string = `http://${process.env.host}:${process.env.port}`