const router = require("express").Router();
const userCntrlr = require("../controllers/userCntrlr");
const Auth = require("../middleware/Auth");

router.get("/", (req, res) => {
  console.log("some fdkjdlsk");
  res.send("hello");
});

module.exports = router;
