const { body, validationResult } = require("express-validator");
const validate = {};

// Validation rules for creating a Career
validate.createCareerRules = () => {
  return [
    body("userId")
      .trim()
      .notEmpty()
      .isMongoId()
      .withMessage("A valid userId is required."),

    body("education")
      .trim()
      .notEmpty()
      .withMessage("Please provide an education field."),

    body("skills")
      .isArray({ min: 1 })
      .withMessage("Please provide at least one skill.")
      .custom((skills) => {
        if (!skills.every(skill => typeof skill === "string")) {
          throw new Error("Skills must be an array of strings.");
        }
        return true;
      }),

    body("isEmployed")
      .notEmpty()
      .isBoolean()
      .withMessage("Employment status must be a boolean value."),

    body("company")
      .optional()
      .trim()
      .custom((company, { req }) => {
        if (req.body.isEmployed && !company) {
          throw new Error("Company name is required if employed.");
        }
        return true;
      })
  ];
};

// Validation rules for updating a Career
validate.updateCareerRules = () => {
  return [
    body("education")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Please provide an education field."),

    body("skills")
      .optional()
      .isArray()
      .withMessage("Skills must be an array.")
      .custom((skills) => {
        if (!skills.every(skill => typeof skill === "string")) {
          throw new Error("Skills must be an array of strings.");
        }
        return true;
      }),

    body("isEmployed")
      .optional()
      .notEmpty()
      .isBoolean()
      .withMessage("Employment status must be a boolean value."),

    body("company")
      .optional()
      .trim()
      .custom((company, { req }) => {
        if (req.body.isEmployed && !company) {
          throw new Error("Company name is required if employed.");
        }
        return true;
      }),

    body().custom((value, { req }) => {
      const allowedFields = ["education", "skills", "isEmployed", "company"];
      const receivedFields = Object.keys(req.body);

      const extraFields = receivedFields.filter(field => !allowedFields.includes(field));

      if (extraFields.length > 0) {
        throw new Error(`Unexpected fields provided: ${extraFields.join(", ")}`);
      }
      
      return true;
    })
  ];
};

validate.careerData = async (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;
