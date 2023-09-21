const express = require("express");
const router = express.Router();

// Import controller function to get group details
const { createGroup, getAllGroups,deleteGroup } = require("../controllers/groups");

// Get group details
router.route('/groups').post(createGroup);
router.route("/groups").get(getAllGroups);
router.route("/groups/:id").delete(deleteGroup)

module.exports = router;
