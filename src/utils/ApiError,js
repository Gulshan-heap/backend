class ApiError extends Error { // Define a custom error class named ApiError that extends the built-in Error class
    constructor(statusCode, message = "Something went wrong", error = [], stack = "") { 
        // The constructor runs when you create a new ApiError instance.
        // It accepts:
        // - statusCode: HTTP status code (e.g. 400, 404, 500)
        // - message: descriptive error message (default: "Something went wrong")
        // - error: an array or list of specific error details (default: empty array)
        // - stack: optional stack trace string (default: empty string)

        super(message); // Call the parent (Error) constructor so the built-in error behavior (message, name, stack) is initialized.

        this.statusCode = statusCode; // Store the HTTP status code for easy access later.
        this.error = error; // Store detailed error info (array or object).
        this.stack = stack; // Assign the stack trace if provided.
        this.success = false; // Always false for errors — indicates operation failure.

        this.errors = errors; // ❌ BUG: 'errors' is not defined; should likely be 'this.error' or 'error'.

        this.message = message; // Store the message explicitly on the instance (redundant but harmless).

        if (stack) { 
            // If a custom stack trace string was passed in, keep it.
            this.stack = stack;
        } else {
            // Otherwise, capture the current call stack automatically.
            Error.captureStackTrace(this, this.constructor);
            // Alternative manual method (commented out):
            // this.stack = (new Error()).stack;
        }
    }
}
