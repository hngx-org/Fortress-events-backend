const express = require("express");
const router = express.Router();

module.exports = router;
const { Router } = require("express");
const { createGroup, getGroups } = require("../controller/groups");

const groupsRoutes = Router();

groupsRoutes.get("/groups", getGroups);

groupsRoutes.post("/groups", createGroup);

module.exports = groupsRoutes;
