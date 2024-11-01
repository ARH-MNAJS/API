# API Endpoint Demos

## 1. Register a New User

- **Endpoint**: `POST /auth/register`  
- **Description**: Registers a new user in the system.

### Request
```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

### Response
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "64b8f8b3a19d4b0012345678",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "createdAt": "2024-10-31T08:22:17.123Z"
  }
}
```

## 2. Login a User

- **Endpoint**: `POST /auth/login`  
- **Description**: Logs in an existing user and initiates a session.

### Request
```http
POST /auth/login
Content-Type: application/json

{
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

### Response
```json
{
  "message": "Login successful",
  "user": {
    "id": "64b8f8b3a19d4b0012345678",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "sessionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## 3. Retrieve All Users

- **Endpoint**: `GET /users`  
- **Description**: Retrieves a list of all registered users. Authentication is required.

### Request
```http
GET /users
Authorization: Bearer <session-token>
```

### Response
```json
{
  "users": [
    {
      "id": "64b8f8b3a19d4b0012345678",
      "username": "johndoe",
      "email": "johndoe@example.com"
    },
    {
      "id": "64b8f8b3a19d4b0012345679",
      "username": "janedoe",
      "email": "janedoe@example.com"
    }
  ]
}
```

## 4. Update a User

- **Endpoint**: `PATCH /users/:id`  
- **Description**: Updates a user's information by ID. Authentication and ownership are required.

### Request
```http
PATCH /users/64b8f8b3a19d4b0012345678
Content-Type: application/json
Authorization: Bearer <session-token>

{
  "username": "johnsmith"
}
```

### Response
```json
{
  "message": "User updated successfully",
  "user": {
    "id": "64b8f8b3a19d4b0012345678",
    "username": "johnsmith",
    "email": "johndoe@example.com"
  }
}
```

## 5. Delete a User

- **Endpoint**: `DELETE /users/:id`  
- **Description**: Deletes a user by ID. Authentication and ownership are required.

### Request
```http
DELETE /users/64b8f8b3a19d4b0012345678
Authorization: Bearer <session-token>
```

### Response
```json
{
  "message": "User deleted successfully"
}
```
