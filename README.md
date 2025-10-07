vvvv# Blog It - Backend

A simple backend for the blog app with GraphQL API.

## Setup Steps

1. Clone this repository
2. Go to project folder

```
cd blog-it-backend
```

3. Install all packages

```
npm install
```

4. Create a .env file and add these

```
PORT=4000
MONGODB_URL=YOUR_MONGODB_URL
JWT_SECRET=YOUR_JWT_SECRET
```

5. Run the server

```
npm run dev
```

6. Open the url in your browser

```
http://localhost:4000/graphql
```

7. You can also seed the database with test data

```
npm run seed
```

## API Features

- User signup and signin
- Create new blog posts
- Get all blog posts
- Get single blog post
- Get user profile

## Tech used

- Node.js
- Express
- GraphQL
- Apollo Server
- MongoDB with Mongoose
- JWT for auth
- Bcrypt for password

## Test Account

Same test account will work in frontend:

- Email: jothika@example.com
- Password: Hello@2025

Made with ❤️ by Jothika
