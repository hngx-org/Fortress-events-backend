# EVENTS API Documentation

This document provides documentation for the API endpoints specified below.

## Table of Contents

- [Events Endpoints](#events-endpoints)

  - [Get Event by Id](#get-Events-by-Id)
  - [Get All Events](#get-all-Events)
  - [Get All Events for a particular group](#get-all-Events-for-group)
  - [Create Event](#create-Event)
  - [Update Event](#update-Event)
  - [Delete Event](#delete-Event)

## Events Endpoints


### Get Events by Id

Retrieve details of a specific event by their id.

- **URL**: `/api/events/:eventId`
- **Method**: `GET`
- **Request Param**: EventId
- **Response**: Event record Object

### Get all Events

Retrieve details of all events.

- **URL**: `/api/events`
- **Method**: `GET`
- **Request**: None
- **Response**: Array/List of Event objects

### Get all Events for group

Retrieve details of all events for a particular group.

- **URL**: `/api/events/:groupId`
- **Method**: `GET`
- **Request Params**: groupId
- **Response**: Array/List of Event objects


### Update Event

Update the details of a specific event.

- **URL**: `/api/events/:eventId`
- **Method**: `PUT`
- **Request body**:

  ```json
  {
  "title": "title",
  "description": "description",
  "location": "location",
  "creator_id": "creator_id",
  "start_date": "start_date",
  "end_date": "end_date",
  "start_time": "start_time",
  "end_time": "end_time",
    }
  ```
- **Response**: If successfully updated, (Success - HTTP Status Code 200)
  ```

### Create Event

Create an event.

- **URL**: `/api/events`
- **Method**: `POST`
- **Request body**:

  ```json
  {
  "title": "title",
  "description": "description",
  "location": "location",
  "creator_id": "creator_id",
  "start_date": "start_date",
  "end_date": "end_date",
  "start_time": "start_time",
  "end_time": "end_time",
    }
  ```
- **Response**: Created Event Object

### Delete Event

Delete an event.

- **URL**: `/api/events/:eventId`
- **Method**: `DELETE`
- **Request params**: eventId
- **Response**: Created Event Object