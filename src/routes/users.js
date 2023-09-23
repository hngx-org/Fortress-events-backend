const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateSingleUserProfile,
  getUser,
  createUser,
} = require("../controllers/users");

router.route("/users/:id").put(updateSingleUserProfile).get(getUser);
router.route("/users").get(getAllUsers).post(createUser);

router.get("/", (req, res) => {
  res.send("you've got the wrong route but TEAM FORTRESS API is WORKING!!!");
});

router.post("/login", (req, res) => {
  res.redirect("/users");
});

// logout kill session
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    console.log(req?.session?.user);
    return res.send("youve been logged out...");
  });
});

module.exports = router;
