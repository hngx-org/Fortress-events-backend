# EVENTS APP BACKEND

Backend for the events mobile app. Built as part of the HNGx Internship by team fortress.


## Table of Contents
  - [Project Configuration](#project-configuration)
- [Getting Started](#getting-started-running-the-server)
  - [Tech Stack](#tech-stack)
  - [Testing](#testing)
- [Endpoints](#endpoints) 
  - [APIs](#apis) 
  - [Request](#request) 
  - [Response](#response) 
  - [Response Status](#response-status) 
- [License](#license)
- [Documentation](#documentation)
- [Links](#links)
- [The Team](#the-team)


## 📁 Project Configuration

The project is divided into:

- Controllers: found in `src/controller` folder. Coordinates the interaction between the UI and the backend services.

- Middlewares: found in `src/middlewares` folder. Logic to process incoming HTTP requests and perform tasks such as authentication, validation, etc.

- Model: found in `src/model` directory. Database Schema of the events app.

- Routes: found in `src/routes` directory. URL endpoints and their corresponding method/action.


## Getting Started: Running the Server

### 🔧 Tech Stack

- NodeJS
- ExpressJS
- MySQL

### 📝 Requirements

This project requires nodeJS version >= 14 and npm package manager.

### 💻 Running Locally

1. Clone this repository by running:
   ```bash
   git clone https://github.com/hngx-org/Fortress-events-backend
   cd Fortress-events-backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Using the `.env_sample` template, create a `.env` file and fill in the values for each environment variables.
4. Start the server in dev mode:
   ```bash
   npm run build
   ```


### 💻 Testing

Tests can be carried out locally by running:

```bash
npm run test
```

Alternatively, online API testing tools such as **Postman** can be used to test the endpoints.


## 🌐 Endpoints

### apis

The events app backend provides the following APIs:

## 🌐 Endpoints


- POST `/api/users/register` -> User registration
- POST `/api/users/login` -> User login
- GET `/api/users/profile` -> Get user profile
- PUT `/api/users/profile` -> Update user profile
- POST `/api/events` -> Create a new event
- GET `/api/events` -> Get a list of events
- GET `/api/events/:eventId` -> Get event details
- PUT `/api/events/:eventId` -> Update event details
- DELETE `/api/events/:eventId` -> Delete and event
- POST `/api/events/:eventId/comments` -> Add a comment to an event
- GET `/api/events/:eventId/comments` -> Get comments for an event
- POST `/api/comments/:commentId/images` -> Add an image to a comment
- GET `/api/comments/:commentId/images` -> Get images for a comment
- POST `/api/users/:userId/interests/:eventId` -> Express interest in an event
- DELETE `/api/users/:userId/interests/:eventId` -> Remove interest in an event
- POST `/api/groups` -> Create a new group
- GET `/api/groups/:groupId` -> Get group details
- PUT `/api/groups/:groupId` -> Update group details
- DELETE `/api/groups/:groupId` -> Delete a group
- POST `/api/groups/:groupId/members/:userId` -> Add a user to a group
- DELETE `/api/groups/:groupId/members/:userId` -> Remove a user from a group


### 📩 Request

- Accepts JSON only.
- Request body should **only** contain the specified values and follow the database schema.
- Example request:
  ```json
  {
    "name": "NAME"
  }
  ```

### 📂 Response

Returns JSON.

### ⚠️ Response Status

- 200 - OK: User or resource has been successfully updated.
- 201 - Created: User or resource has been successfully created.
- 400 - Bad Request:
  - Request body has more than the specified attribute.
  - Invalid content-Type.
- 403 - Unauthorized: A user is not authenticated
- 404 - User or Resource Not Found.
- 500 - Internal Server Error.


## 📄 License

This project uses the MIT License as found in [LICENSE](/LICENSE)

## 📖 Documentation


Documentation can be found in `/api-docs` endpoint.

Documentation can be found [here](https://github.com/hngx-org/Fortress-events-backend/tree/main/routeDocs)


## 🔗 Links

* [Server URL](http://ec2-18-119-101-235.us-east-2.compute.amazonaws.com:3000/)

## 🤝 The Team

Built by TEAM FORTRESS
