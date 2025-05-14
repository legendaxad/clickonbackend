import { body, validationResult } from "express-validator";

export const validateProduct = [
  body("name").notEmpty().withMessage("Name is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a non-negative number"),
  body("brand").notEmpty().withMessage("Brand is required"),
  body("image").isURL().withMessage("Image must be a valid URL"),
  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),
  body("inventoryStatus")
    .optional()
    .isIn([
      "HOT",
      "BEST DEALS",
      "25% OFF",
      "SALE",
      "INSTOCK",
      "LOWSTOCK",
      "OUTOFSTOCK",
      "",
    ])
    .withMessage("Invalid inventory status"),

  // Error handler middleware
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
