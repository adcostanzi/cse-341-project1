const { body, validationResult } = require("express-validator");

const contactValidator = () => {
  return [
    body("firstName", "Name is required").not().isEmpty(),
    body("lastName", "Lastname is required").not().isEmpty(),
    body("email", "Please provide a valid email").isEmail().normalizeEmail(),
    body("favoriteColor", "Please enter a favorite color").not().isEmpty(),
    body("birthday", "Please enter date in YYYY-MM-DD format")
      .isISO8601()
      .isLength({ min: 10 }),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorList = [];
  errors.array().map((err) => errorList.push({ [err.param]: err.msg }));
  return res.status(422).json({
    errors: errorList,
  });
};

module.exports = { contactValidator, validate };
