import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { ErrorResponse } from "../types";

export class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public isOperational = true
    ) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export const errorHandler = async (err: Error, c: Context) => {
    console.error("Error:", err);

    let response: ErrorResponse = {
        status: "error",
        statusCode: 500,
        message: "Something went wrong!",
    };

    if (err instanceof AppError) {
        response = {
            status: "fail",
            statusCode: err.statusCode,
            message: err.message,
        };
        return c.json(response);
    }

    if (err instanceof HTTPException) {
        response = {
            status: "fail",
            message: err.message,
        };
        return c.json(response, err.status);
    }

    if (err.name === "ZodError") {
        response = {
            status: "fail",
            message: "Validation error",
            errors: err,
        };
        return c.json(response, 400);
    }

    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
    }

    return c.json(response, 500);
};
