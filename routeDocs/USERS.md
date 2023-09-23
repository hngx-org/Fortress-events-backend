# USERS API Documentation

This document provides documentation for the API endpoints specified below.

## Table of Contents

- [User Endpoints](#user-endpoints)
    
  - [Get User by Id](#get-user-by-Id)
  - [Update User](#update-user)
  - [Login](#login-user)
  - [Logout](#logout-user)

---

## Users Endpoints


### Login User

Create a new user record or Login if exists.

- **URL**: `/users`
- **Method**: `POST`
- **Request**:

  ```json
  {
    "displayName": "updated name",
    "email": "your_email@yahoo.com",
    "photoUrl": "stringOfUrl.com"
  }
  ```
- **Response**: If successfully updated, (Success - HTTP Status Code 200) and details of new user is returned, else (Failed - HTTP Status Code 400)
  ```json
   {
    "name": "your_name",
    "email": "your_email",
    "avatar": "your avatar url"
  }
  ```


### Get User By Id

Retrieve details of a specific user by their id.

- **URL**: `/api/users/:user_id`
- **Method**: `GET`
- **Request**: None
- **Response**: If user exists, (Success - HTTP Status Code 200) and details of username searched, else (Failed - HTTP Status Code 400).


### Update User

Update the details of a specific user.

- **URL**: `/api/users/:user_id` Where `:user_id` should be replaced with the **`CURRENT`** id of the already existing user.
- **Method**: `PUT`
- **Request**:

  ```json
  {
    "name": "updated name",
    "email": "updated email",
    "avatar": "updated avatar url"
  }
  ```
- **Response**: If successfully updated, (Success - HTTP Status Code 200) and details of new user is returned, else (Failed - HTTP Status Code 400)
  ```json
   {
    "name": "updated name",
    "email": "updated email",
    "avatar": "updated avatar url"
  }
  ```

### Logout User

Retrieve details of a specific user by their id.

- **URL**: `/logout`
- **Method**: `GET`
- **Request**: None
- **Response**: 'string'
