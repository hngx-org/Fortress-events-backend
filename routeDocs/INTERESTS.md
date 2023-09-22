# INTERESTS API Documentation

This document provides documentation for the API endpoints specified below.

## Table of Contents

- [Events Endpoints](#interests-endpoints)

  - [Get All Events for a particular event](#get-all-interests-for-event)
  - [Create Event](#create-interest)
  - [Delete Event](#delete-interest)

## Interests Endpoints


### Get all Interests for event

Retrieve details of all Interests for a particular event.

- **URL**: `/api/events/:groupId`
- **Method**: `GET`
- **Request Params**: groupId
- **Response**: Array/List of Interest objects

### Create Interest

Create an Interest.

- **URL**: `/api/users/:userId/interests/:eventId`
- **Method**: `POST`
- **Request params**: userId, eventId
- **Response**: Not sure lol but status code of good.

### Delete Interest

Delete interest.

- **URL**: `/api/users/:userId/interests/:eventId`
- **Method**: `DELETE`
- **Request params**: eventId, userId
- **Response**: true || 1