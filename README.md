# BlogPlatform

This is a simple RESTful API for a blogging platform that allows users to create, read, update, and delete blog posts. The API also supports user authentication for managing their own posts.

## Technologies Used

- Node.js
- Express.js
- MongoDB 
- JSON Web Tokens (JWT) for Authentication

## Getting Started

1. Clone this repository:

   ```bash
   git clone <repository-url>

2. Install dependencies:
   
   cd server
   npm install

## 3. Configure environment variables by creating a .env file if you want (NOTE:I have included my .env file in the repository for your convenience)

Copy the following code and assign Mongo DB URI,PASSWORD,PORT number,JWT_SECRET of your choiceif you are creating a new .env file:

PORT=4000
DATABASE_URI=
DATABASE_PASSWORD=
JWT_SECRET=
JWT_EXPIRES_IN=90d

4. Start the Server:

npm start

5.Your API should now be running on http://localhost:4000.

## API Endpoints

POST /api/register: Allows users to register by providing a name,username and password.
POST /api/login: Allows registered users to log in and obtain a token for authentication.
GET /api/posts: Fetches a list of all blog posts.
GET /api/posts/:id: Retrieves a specific blog post by ID.
POST /api/posts: Allows authenticated users to create a new blog post.
PUT /api/posts/:id: Allows authenticated users to update their own blog post.
DELETE /api/posts/:id: Allows authenticated users to delete their own blog post.

## Authentication

User authentication is implemented using JSON Web Tokens (JWT).The token is necessary for login and accessing specific API Endpoints
Users can only edit or delete their own posts.

## Error Handling

The API includes appropriate error handling for common scenarios such as invalid input, unauthorized access, and non-existent resources.

## Bonus Features Implemented

Pagination for the list of blog posts.
Adding categories to blog posts.
Adding comments to blog posts.

## API Documentation

https://documenter.getpostman.com/view/26558749/2s9Y5Tyjp9
