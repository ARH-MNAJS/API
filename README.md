# AuthAPI
![AuthAPI](https://github.com/ARH-MNAJS/AuthAPI/blob/master/cover.png?raw=true)
## Overview

AuthAPI is a Node.js application built with Express and Mongoose that provides a foundational backend for user authentication and management. It connects to a MongoDB Atlas database and offers RESTful API endpoints for user registration, login, and session handling, serving as a flexible starting point for more complex applications.

## Features

- **User Registration**: Allows new users to create an account.
- **User Login**: Authenticates users and manages sessions.
- **Session Management**: Uses cookies to handle user sessions securely.
- **User Data Management**: Endpoints to retrieve, update, and delete user data.
- **Authorization**: Ensures that users can modify only their own data.

## Project Structure

```plaintext
api/
├── src/
│   ├── controllers/
│   │   ├── authentication.ts        # Handles authentication logic (login/register)
│   │   └── users.ts                 # Handles user data management (CRUD operations)
│   ├── db/
│   │   └── users.ts                 # Database model and user-related functions
│   ├── helpers/
│   │   └── index.ts                 # Helper functions for authentication
│   ├── middlewares/
│   │   └── index.ts                 # Middleware for authentication and authorization checks
│   ├── router/
│   │   ├── authentication.ts        # Routes for authentication
│   │   ├── users.ts                 # Routes for user management
│   │   └── index.ts                 # Main router file
│   ├── index.ts                      # Entry point of the application
├── package.json                      # Project metadata and dependencies
├── nodemon.json                      # Configuration for nodemon
└── tsconfig.json                     # TypeScript configuration
```

## How to Run the Application

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- TypeScript (optional, for development)

### Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure MongoDB Connection**:
   - Update the `MONGO_URL` in `src/index.ts` with your MongoDB Atlas connection string.

4. **Run the Application**:
   ```bash
   npm start
   ```

   The server will start on `http://localhost:8080`.

## API Endpoints

### Authentication

- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Log in an existing user.

### User Management

- **GET /users**: Retrieve all users (requires authentication).
- **DELETE /users/:id**: Delete a user by ID (requires authentication and ownership).
- **PATCH /users/:id**: Update a user's username by ID (requires authentication and ownership).

## Detailed Explanation of Features and Functions

### 1. User Registration

**Endpoint**: `POST /auth/register`

- **Function**: `register`
- **Description**: Handles user registration by creating a new user in the database.
- **Parameters**: Expects `username`, `email`, and `password` in the request body.
- **Response**: Returns the created user object or an error message.

### 2. User Login

**Endpoint**: `POST /auth/login`

- **Function**: `login`
- **Description**: Authenticates a user by checking their email and password.
- **Parameters**: Expects `email` and `password` in the request body.
- **Response**: Returns the user object and sets a session cookie if successful.

### 3. Session Management

- **Middleware**: `isAuthenticated`
- **Description**: Verifies user authentication by checking the session token stored in cookies.
- **Usage**: Applied to routes that require user authentication.

### 4. User Data Management

**Functions in `src/db/users.ts`**:

- **getUsers**: Retrieves all users from the database.
- **getUserByEmail**: Finds a user by their email address.
- **getUserBySessionToken**: Finds a user by their session token.
- **getUserById**: Retrieves a user by their ID.
- **createUser**: Creates a new user in the database.
- **deleteUserById**: Deletes a user by their ID.
- **updateUserById**: Updates user information by their ID.

### 5. User Controller Functions

**Functions in `src/controllers/users.ts`**:

- **getAllUsers**: Retrieves all users and returns them in the response.
- **deleteUser**: Deletes a user by ID and returns the deleted user object.
- **updateUser**: Updates a user's username by ID and returns the updated user object.

### 6. Middleware Functions

**Functions in `src/middlewares/index.ts`**:

- **isOwner**: Verifies that the current user is the owner of the resource they are modifying; returns a `403 Forbidden` status if not.
- **isAuthenticated**: Checks if a user is authenticated and, if so, merges user information into the request object.

### 7. Helper Functions

**Functions in `src/helpers/index.ts`**:

- **random**: Generates a random string for use as a salt in password hashing.
- **authentication**: Creates a hashed password using HMAC with SHA-256.

## Conclusion

AuthAPI is a versatile starting point for building applications that require secure authentication and user data management. It leverages modern technologies like Express and MongoDB, making it easy to extend and adapt as needed. 
