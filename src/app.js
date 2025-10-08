// Importing required dependencies from npm modules
import express from "express";        // Express is the main web framework used to build APIs and web servers
import cors from "cors";              // CORS middleware allows controlled cross-origin requests
import cookieParser from "cookie-parser"; // Middleware to parse cookies from incoming HTTP requests

// Initialize an Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
    origin: process.env.CORS_ORIGIN,  // Allow requests only from this origin (read from environment variable)
    credentials: true,                // Allow cookies and authentication headers to be sent across origins
}));

// Parse incoming JSON requests
app.use(express.json({
    limit: "20kb" // Limit the size of incoming JSON payloads to prevent large-body attacks or overloading
}));

// Parse URL-encoded data (e.g., from HTML forms)
app.use(express.urlencoded({
    extended: true,   // Allows nested objects (e.g., { user: { name: "John" } })
    limit: "20kb"     // Limit request body size for security and performance
}));  

// Serve static files (like images, CSS, JS) from the "public" directory
app.use(express.static("public"));

// Parse cookies from the client's request and make them available in req.cookies
app.use(cookieParser());

// Export the configured Express app instance to be used in your server file (e.g., server.js or index.js)
export { app };
// This modular approach keeps the app configuration separate and clean.

// Note: Actual route handlers and error handling middleware would be added in other files or later in this file.