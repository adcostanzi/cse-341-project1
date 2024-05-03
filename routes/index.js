const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  // #swagger.tags=["Welcome to Project 1 for CSE341"]
  res.send("Welcome to Project 1 for CSE341");
});

router.use("/contacts", require("./contacts"));

router;

module.exports = router;
