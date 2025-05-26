const express = require("express");
const designController = require("../controllers/design-controller");
const authenticatedRequest = require("../middleware/auth-middleware");

const router = express.Router();

// Public route for fetching all public templates
router.get("/public/all", designController.getPublicDesigns);

// All routes below require authentication
router.use(authenticatedRequest);

router.get("/", designController.getUserDesigns);
router.get("/:id", designController.getUserDesignsByID);
router.post("/", designController.saveDesign);
router.delete("/:id", designController.deleteDesign);
// Set a design as public/private
router.patch("/:id/public", designController.setDesignPublic);

module.exports = router;
