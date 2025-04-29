export class UserNotFoundError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "UserNotFoundError";
        Object.setPrototypeOf(this, UserNotFoundError.prototype);
    }
}

export class InvalidCredentialsError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "InvalidCredentialsError";
        Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
    }
}