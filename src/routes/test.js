const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/test");

router.get("/test", getAllUsers);
router.get("/", getAllUsers);

module.exports = router;
