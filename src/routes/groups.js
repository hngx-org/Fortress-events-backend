const express = require("express");
const router = express.Router();
const {
  createGroup,
  getAllGroups,
  getSingleGroup,
  updateGroup,
  deleteGroup,
} = require("../controllers/groups");

router.route("/groups").get(getAllGroups).post(createGroup);

router
  .route("/groups/:groupId")
  .get(getSingleGroup)
  .put(updateGroup)
  .delete(deleteGroup);

module.exports = router;
