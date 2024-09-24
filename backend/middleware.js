// This middlewware is basically used to authenticate before user entering into some specific pages, so it is a general middleware where ever we feel to appy.

// remember we verify token through JWT_SECRET

const { JWT_SECRET } =  require("./config");
const jwt = require("jsonwebtoken");

// The purpose of this middleware is to verify that incoming requests contain a valid JSON Web Token (JWT) in the Authorization header.
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}

// In summary, this middleware ensures that only requests with a valid JWT can proceed, providing a layer of security by verifying the authenticity of the token.


// Authentication in a Node.js application, particularly one using Express.js, typically involves several steps and components working together. Here's a high-level overview of how authentication takes place in such an application:

//User Registration:
//The user provides their credentials (e.g., username, password) via a registration endpoint.The server hashes the password using a library like bcrypt and stores the hashed password along with other user details in the database.

//User Login:
//The user provides their credentials via a login endpoint.The server retrieves the user details from the database and compares the provided password with the stored hashed password using bcrypt.If the credentials are valid, the server generates a JSON Web Token (JWT) using a library like jsonwebtoken. This token typically includes user information (e.g., userId) and is signed with a secret key (JWT_SECRET).//

//Token Issuance:The server sends the generated JWT back to the client (e.g., in the response body or as a cookie).The client stores the token (e.g., in local storage or a cookie) and includes it in the Authorization header of subsequent requests to protected endpoints.

//Token Verification (Middleware):For protected routes, the server uses an authentication middleware to verify the JWT.The middleware extracts the token from the Authorization header, verifies it using the secret key, and decodes it to retrieve user information.If the token is valid, the middleware attaches the user information (e.g., userId) to the request object and calls next() to pass control to the next middleware or route handler.If the token is invalid or missing, the middleware responds with a 403 Forbidden status.

//Accessing Protected Routes:Once authenticated, the user can access protected routes. The server can use the user information attached to the request object to perform authorization checks and serve the appropriate content or perform actions.