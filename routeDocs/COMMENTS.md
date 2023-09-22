# COMMENTS API Documentation

This document provides documentation for the API endpoints specified below.

## Table of Contents

- [Comments Endpoints](#comments-endpoints)


  - [Get All Comments for a particular event](#get-all-Comments-for-event)
  - [Create Comment](#create-Comment)


## Comments Endpoints


### Get all Comments for event

Retrieve details of all comments for a particular event.

- **URL**: `/api/events/:eventId/comments`
- **Method**: `GET`
- **Request Params**: eventId
- **Response**: Array/List of Comment objects populated with image urls



### Create Comment

Create a comment.

- **URL**: `/api/events/:eventId/comments`
- **Method**: `POST`
- **Request body**:

  ```json
  {
  "body": "body",
  "event_id": "event_id",
  "user_id": "user_id",
  "url": "url", //this is the url of the image after it has been saved to the clouds
    }
  ```
- **Response**: The comment that was just created