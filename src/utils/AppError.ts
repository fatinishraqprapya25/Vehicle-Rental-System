class AppError extends Error {
    public statusCode: number;
    public success: boolean;
    constructor(_statusCode: number, _message: string) {
        super(_message);
        this.statusCode = _statusCode;
        this.success = false;
        if (Error.captureStackTrace!) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default AppError;