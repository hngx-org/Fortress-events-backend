const express = require("express");
const router = express.Router();

// Import controller function to get group details
const {
  createGroup,
  getAllGroups,
  getGroupDetails,
  updateGroupDetails,
  deleteGroup,
  deleteGroupMemberById,
  addUserToGroup,
  getAllUserFromGroup,
  getAllEventFromAGroup,
  getEventNumFromGroup,
  getNumUserFromGroup,
} = require("../controllers/groups");

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: API endpoints for groups
 */

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Create a new group
 *     description: Use this endpoint to create a new group.
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the group.
 *     responses:
 *       '200':
 *         description: Group created successfully.
 *       '500':
 *         description: Internal server error.
 *
 *   get:
 *     summary: Get all groups
 *     description: Use this endpoint to retrieve a list of all groups.
 *     tags: [Groups]
 *     responses:
 *       '200':
 *         description: Groups retrieved successfully.
 *       '500':
 *         description: Internal server error.
 */

router.route("/groups").post(createGroup).get(getAllGroups);

/**
 * @swagger
 * /api/groups/{groupId}:
 *   get:
 *     summary: Get group details by ID
 *     description: Use this endpoint to retrieve details of a group by its ID.
 *     tags: [Groups]
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group.
 *     responses:
 *       '200':
 *         description: Group details retrieved successfully.
 *       '500':
 *         description: Internal server error.
 *
 *   put:
 *     summary: Update group details by ID
 *     description: Use this endpoint to update details of a group by its ID.
 *     tags: [Groups]
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define your group properties here
 *     responses:
 *       '200':
 *         description: Group details updated successfully.
 *       '500':
 *         description: Internal server error.
 *
 *   delete:
 *     summary: Delete a group by ID
 *     description: Use this endpoint to delete a group by its ID.
 *     tags: [Groups]
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group.
 *     responses:
 *       '200':
 *         description: Group deleted successfully.
 *       '500':
 *         description: Internal server error.
 */
router
  .route("/groups/:groupId")
  .get(getGroupDetails)
  .put(updateGroupDetails)
  .delete(deleteGroup);

/**
 * @swagger
 * /api/groups/{groupId}/users:
 *   delete:
 *     summary: Remove a user from a group by ID
 *     description: Use this endpoint to remove a user from a group by their ID.
 *     tags: [Groups]
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group.
 *     responses:
 *       '200':
 *         description: User removed from the group successfully.
 *       '500':
 *         description: Internal server error.
 */
router.route("/groupId/:userId").delete(deleteGroupMemberById);

/**
 * @swagger
 * /api/groups/{groupId}/users:
 *   post:
 *     summary: Add a user to a group by ID
 *     description: Use this endpoint to add a user to a group by their ID.
 *     tags: [Groups]
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group.
 *     responses:
 *       '200':
 *         description: User added to the group successfully.
 *       '500':
 *         description: Internal server error.
 */
router.route("/groups/:groupId").post(addUserToGroup);

/**
 * @swagger
 * /api/groups/{groupId}/events/count:
 *   get:
 *     summary: Get the number of events in a group
 *     description: Use this endpoint to retrieve the number of events associated with a group.
 *     tags: [Groups]
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group.
 *     responses:
 *       '200':
 *         description: Number of events retrieved successfully.
 *       '500':
 *         description: Internal server error.
 */
router.route("/num/:groupId/events").get(getEventNumFromGroup);

/**
 * @swagger
 * /api/groups/{groupId}/events:
 *   get:
 *     summary: Get all events in a group
 *     description: Use this endpoint to retrieve all events associated with a group.
 *     tags: [Groups]
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group.
 *     responses:
 *       '200':
 *         description: Events retrieved successfully.
 *       '500':
 *         description: Internal server error.
 */
router.route("/groups/:groupId/events").get(getAllEventFromAGroup);

/**
 * @swagger
 * /api/groups/{groupId}/users/count:
 *   get:
 *     summary: Get the number of users in a group
 *     description: Use this endpoint to retrieve the number of users in a group.
 *     tags: [Groups]
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group.
 *     responses:
 *       '200':
 *         description: Number of users retrieved successfully.
 *       '500':
 *         description: Internal server error.
 */
router.route("/num/:groupId/users").get(getNumUserFromGroup);

/**
 * @swagger
 * /api/groups/{groupId}/users:
 *   get:
 *     summary: Get all users in a group
 *     description: Use this endpoint to retrieve all users in a group.
 *     tags: [Groups]
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the group.
 *     responses:
 *       '200':
 *         description: users retrieved successfully.
 *       '500':
 *         description: Internal server error.
 */
router.route("/groups/:groupId/users").get(getAllUserFromGroup);

module.exports = router;
