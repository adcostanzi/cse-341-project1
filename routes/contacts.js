const express = require("express");
const router = express.Router();
const validator = require("../validator");
const utilities = require("../utilities/utilities");

const contactController = require("../controllers/contacts");

router.get("/", utilities.handleErrors(contactController.getAll));

router.get("/:id", utilities.handleErrors(contactController.getSingle));

router.post(
  "/",
  validator.contactValidator(),
  validator.validate,
  utilities.handleErrors(contactController.createContact)
);

router.put(
  "/:id",
  validator.contactValidator(),
  validator.validate,
  utilities.handleErrors(contactController.updateContact)
);

router.delete("/:id", utilities.handleErrors(contactController.deleteContact));

module.exports = router;
