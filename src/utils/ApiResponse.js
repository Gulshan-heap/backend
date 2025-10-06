class ApiResponse {
    constructor(statusCode, success, message="Success", data = null) {
        this.statusCode = statusCode;
        this.success = success;
        this.message = message;
        this.data = data;
    }
    // to send the response
}
