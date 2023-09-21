# API ENDPOINT (GET EVENT COMMENTS)

This commit adds a new **GET** api endpoint `api/events/:eventId/comments` to Team Fortress events app backend service.

## Description
This endpoint provides the following capabilities to Team Fortress Events App Backend service:
* Adds a new api endpoint: `api/events/:eventId/comments`
* Retrieve the comments posted by users of the Events app.

This endpoint adds three additional files in three directories:
- The test file for the new endpoint: [./src/tests/getEventCommentsController.test.js](./src/tests/getEventCommentsController.test.js)

- `getEventComments controller.js` file for the new endpoint: [./src/controller/getEventComments.js](./src/tests/getEventCommentsController.test.js)

- `getEventCommentsRoute.js` file for the new endpoint: [./src/routes/getEventCommentsRoute.js](./src/tests/getEventCommentsController.test.js)

Additionally `app.js` was modified to use this new endpoint.

## Related Issue
Any bugs found in this endpoint can be directed to team fortress slack channel.

## How Has This Been Tested?
- This endpoint was tested with chai testing library and the mocha test runner.

- The tests for this code can be found at [./src/tests/getEventCommentsController.test.js](./src/tests/getEventCommentsController.test.js)

- For convenience, you can run this test by typing this command:
  ```bash
  npm run test
  ```

- To ensure non-breaking code changes:
  * The POST `api/events/:eventId/` endpoint was tested to create a dummy `games` event.
  * The POST `api/events/:eventId/comments` endpoint was tested to create comments.
  * A GET request was made to `api/events/:eventId/comments` to retrieve the dummy comments created.
  * Finally, a delete request was made to `api/events/:eventId/` to delete the games event.

## Docs
### Request
Returns all the comments of users of a particular event in JSON.

## Response Status
* 400 - Bad Request:
  - Request body has more than the specified attribute.
  - Invalid content-Type.
* 404 - User or Resource Not Found.
* 500 - Internal Server Error.


## Screenshots
The following screenshots is a demo test in mocha showing the successful passing of the testcases
[!](/screenshots/all_comments.png)

[!](/screenshots/comment_by_id.png)

## Types of changes
- [x] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)

## Checklist:
- [x] My code follows the code style of this project.
- [x] My change requires a change to the documentation.
- [x] I have updated the documentation accordingly.
- [x] I have read the **CONTRIBUTING** document.
- [x] I have added tests to cover my changes.
- [x] All new and existing code integrates seemlesely with another.

## Authors
TEAM FORTRESS

[Assunta Maria](https://github.com/G-RIMA)

[Leo](https://github.com/leoemaxie)
