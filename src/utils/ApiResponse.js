class ApiResponse { // Declare a class named ApiResponse (ES6 class syntax)
    constructor(statusCode, success, message = "Success", data = null) { // Special method run when `new ApiResponse(...)` is called; accepts 4 params (2 have defaults)
        this.statusCode = statusCode; // Save the HTTP status code (e.g. 200, 404) to the instance
        this.success = success; // Save a boolean indicating whether the operation succeeded
        this.message = message; // Save a human-readable message (defaults to "Success" if unspecified)
        //default parameter: if the caller omits message or passes undefined, the parameter becomes the string "Success". Note: default only applies when the argument is undefined (not for other falsy values like "" or 0).

        this.data = data; // Save the response payload (object/array/value) — defaults to null if no payload
    } // End of constructor
    // to send the response — placeholder comment showing author intended a send method here (but no method is implemented)
} // End of class ApiResponse

export {ApiResponse}