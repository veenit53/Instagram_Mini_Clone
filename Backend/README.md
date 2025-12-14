# Instagram Mini Clone - Backend

This is the backend API for the Instagram Mini Clone application built with Node.js, Express, and MongoDB.

## Features

- User authentication (Register, Login, Logout)
- JWT-based authorization
- User profile management
- Follow/Unfollow functionality
- Create and view posts
- Image upload using Multer
- Token blacklisting for logout
- CORS enabled for frontend communication

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **File Upload**: Multer
- **Environment Management**: dotenv

## Installation

1. Clone the repository:
```bash
git clone https://github.com/veenit53/Instagram_Mini_Clone.git
cd Instagram_Mini_Clone/Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Backend directory:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### User Routes (`/users`)

- **POST** `/register` - Register a new user
  - Required fields: `fullname.firstname`, `fullname.lastname`, `username`, `email`, `password`
  
- **POST** `/login` - Login user
  - Required fields: `email`, `password`
  - Returns: token, user data
  
- **GET** `/profile` - Get logged-in user profile
  - Headers: `Authorization: Bearer <token>`
  - Returns: user data, user posts
  
- **GET** `/logout` - Logout user
  - Headers: `Authorization: Bearer <token>`
  
- **POST** `/follow/:id` - Follow/Unfollow a user
  - Headers: `Authorization: Bearer <token>`
  - Params: `id` - user ID to follow/unfollow

### Post Routes (`/posts`)

- **POST** `/create` - Create a new post
  - Headers: `Authorization: Bearer <token>`
  - Body: multipart/form-data with `image` and `caption`
  
- **GET** `/feed` - Get all posts (feed)
  - Headers: `Authorization: Bearer <token>`
  - Returns: array of posts with user information

## Project Structure

```
Backend/
├── controller/
│   ├── post.controller.js      # Post creation and feed logic
│   └── user.controller.js      # User authentication and profile logic
├── middleware/
│   ├── auth.middleware.js      # JWT verification
│   └── multer.middleware.js    # File upload configuration
├── models/
│   ├── user.model.js           # User schema and methods
│   ├── post.model.js           # Post schema
│   └── blacklistToken.model.js # Blacklisted tokens for logout
├── routes/
│   ├── user.routes.js          # User routes
│   └── post.routes.js          # Post routes
├── services/
│   └── user.service.js         # User creation service
├── DB/
│   └── db.js                   # MongoDB connection
├── uploads/                    # Uploaded images directory
├── app.js                      # Express app configuration
├── Server.js                   # Server entry point
├── package.json
└── .env                        # Environment variables
```

## Key Files

- [app.js](app.js) - Express application setup and middleware configuration
- [Server.js](Server.js) - Server initialization
- [auth.middleware.js](middleware/auth.middleware.js) - JWT authentication middleware
- [user.controller.js](controller/user.controller.js) - User controller logic
- [post.controller.js](controller/post.controller.js) - Post controller logic
- [user.model.js](models/user.model.js) - User schema with authentication methods
- [post.model.js](models/post.model.js) - Post schema with references

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 5000) |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT signing |

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Token blacklisting on logout
- CORS protection
- Input validation using express-validator
- Multer file upload filtering (images only)

## Dependencies

See [package.json](package.json) for all dependencies and versions.

## Future Enhancements

- Add likes functionality for posts
- Implement comments on posts
- Real-time notifications with Socket.io
- Search functionality
- Direct messaging
- Post editing and deletion

## Author

Created as a mini version of Instagram with core social media features.