const express = require("express");
const router = express.Router();
const { deleteGroupMemberById } = require("../controllers/groups");

router.delete("/groupId/members/:id", deleteGroupMemberById)

module.exports = router;
