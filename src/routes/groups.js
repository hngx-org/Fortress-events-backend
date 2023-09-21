const express = require("express");
const router = express.Router();
const { getGroups, createGroup } = require("../controllers/groups");

router.route("/groups").get(getGroups).post(createGroup);

module.exports = router;
