# EVENTS API Documentation

This document provides documentation for the API endpoints specified below.

## Table of Contents

- [Events Endpoints](#events-endpoints)

  - [Get Group by Id](#get-Groups-by-Id)
  - [Get All Groups](#get-all-Groups)
  - [Create Group](#create-Group)
  - [Create user in Group](#create-user-Group)
  - [Update Group](#update-Group)
  - [Delete Group](#delete-Group)
  - [Delete user from Group](#delete-user-Group)

## Events Endpoints


### Get Group by Id

Retrieve details of a specific group by it's id.

- **URL**: `/api/groups/:groupId`
- **Method**: `GET`
- **Request Param**: groupId
- **Response**: Group record Object

### Get all Groups

Retrieve details of all groups.

- **URL**: `/api/groups`
- **Method**: `GET`
- **Request**: None
- **Response**: Array/List of Group objects

### Update Group

Update the details of a specific group.

- **URL**: `/api/groups/:groupId`
- **Method**: `PUT`
- **Request body**:

  ```json
  {
  "title": "title"
    }
  ```
- **Response**: If successfully updated, (Success - HTTP Status Code 200)
  ```

### Create Group

Create a group.

- **URL**: `/api/groups`
- **Method**: `POST`
- **Request body**:

  ```json
  {
  "title": "title"
    }
  ```
- **Response**: Created Group Object

### Create user Group

Add a user to a group.

- **URL**: `/api/groups/:groupId/members/:userId`
- **Method**: `POST`
- **Request body**:

  ```json
  {
  "user_id": "user_id",
  "group_id": "group_id",
    }
  ```
- **Response**: Created User-group Object

### Delete User Group

Delete a user.

- **URL**: `/api/groups/:groupId/members/:userId:`
- **Method**: `DELETE`
- **Request params**: eventId, groupId
- **Response**: true