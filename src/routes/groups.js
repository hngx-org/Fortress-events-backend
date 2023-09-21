const express = require("express");
const {
    deleteGroup
} = require("../controllers/groups");

const router = express.Router();

router.delete(`/groups/:id`, deleteGroup)


module.exports = router;