const Design = require("../models/design");

exports.getUserDesigns = async (req, res) => {
  try {
    const userId = req.user.userId;

    const designs = await Design.find({ userId }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      data: designs,
    });
  } catch (e) {
    console.error("Error fetching designs", e);
    res.status(500).json({
      success: false,
      message: "Failed to fetch designs",
    });
  }
};

exports.getUserDesignsByID = async (req, res) => {
  try {
    const userId = req.user.userId;
    const designId = req.params.id;

    const design = await Design.findOne({ _id: designId, userId });

    if (!design) {
      return res.status(404).json({
        success: false,
        message: "Design not found! or you don't have permission to view it.",
      });
    }

    res.status(200).json({
      success: true,
      data: design,
    });
  } catch (e) {
    console.error("Error fetching design by ID", e);
    res.status(500).json({
      success: false,
      message: "Failed to fetch design by ID",
    });
  }
};

exports.saveDesign = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { designId, name, canvasData, width, height, category } = req.body;
    if (designId) {
      const design = await Design.findOne({ _id: designId, userId });
      if (!design) {
        return res.status(404).json({
          success: false,
          message: "Design not found! or you don't have permission to view it.",
        });
      }

      if (name) design.name = name;
      if (canvasData) design.canvasData = canvasData;
      if (width) design.width = width;
      if (height) design.height = height;
      if (category) design.category = category;

      design.updatedAt = Date.now();
      const updatedDesign = await design.save();

      return res.status(200).json({
        success: true,
        data: updatedDesign,
      });
    } else {
      const newDesign = new Design({
        userId,
        name: name || "Untitled Design",
        width,
        height,
        canvasData,
        category,
      });

      const saveDesign = await newDesign.save();
      return res.status(200).json({
        success: true,
        data: saveDesign,
      });
    }
  } catch (e) {
    console.error("Error while saving design", e);
    res.status(500).json({
      success: false,
      message: "Failed to save design",
    });
  }
};

exports.deleteDesign = async (req, res) => {
  try {
    const userId = req.user.userId;
    const designId = req.params.id;
    const design = await Design.findOne({ _id: designId, userId });

    if (!design) {
      return res.status(404).json({
        success: false,
        message: "Design not found! or you don't have permission to delete it.",
      });
    }

    await Design.deleteOne({ _id: designId });

    res.status(200).json({
      success: true,
      message: "Design deleted successfully",
    });
  } catch (e) {
    console.error("Error while deleting design", e);
    res.status(500).json({
      success: false,
      message: "Failed to delete design",
    });
  }
};

// Set a design as public or private
exports.setDesignPublic = async (req, res) => {
  try {
    // Defensive: check req.user and req.params
    if (!req.user || !req.user.userId) {
      console.error("Missing user context in setDesignPublic", { user: req.user });
      return res.status(401).json({ success: false, message: "Unauthorized: missing user context" });
    }
    if (!req.params || !req.params.id) {
      console.error("Missing designId in setDesignPublic", { params: req.params });
      return res.status(400).json({ success: false, message: "Missing designId in request params" });
    }
    const userId = req.user.userId;
    const designId = req.params.id;
    let { public: isPublic } = req.body;
    if (typeof isPublic === "undefined") {
      console.error("Missing 'public' in request body", { body: req.body });
      return res.status(400).json({ success: false, message: "Missing 'public' in request body" });
    }
    // Debug log
    console.log("setDesignPublic called with:", { designId, userId, isPublic, body: req.body, user: req.user });
    // Accept boolean true/false, string 'true'/'false', and number 1/0
    if (typeof isPublic === "string") {
      isPublic = isPublic.toLowerCase() === "true" || isPublic === "1";
    } else if (typeof isPublic === "number") {
      isPublic = isPublic === 1;
    } else {
      isPublic = !!isPublic;
    }
    // Allow owner or admin to update public/private
    const isAdmin = req.user.isAdmin || req.user.role === "admin";
    let design;
    console.log("Querying for design", { isAdmin, designId, userId });
    if (isAdmin) {
      design = await Design.findOne({ _id: designId });
    } else {
      design = await Design.findOne({ _id: designId, userId });
    }
    if (!design) {
      console.log("Design not found or no permission", { designId, userId, isAdmin });
      return res.status(404).json({ success: false, message: "Design not found or no permission.", debug: { designId, userId, isAdmin, user: req.user } });
    }
    console.log("Design found before update:", { id: designId, public: design.public, sharedBy: design.sharedBy });
    if (isPublic) {
      design.public = true;
      design.sharedBy = userId;
    } else {
      design.public = false;
      design.sharedBy = undefined;
    }
    try {
      const saved = await design.save();
      console.log("Design updated and saved:", { id: designId, public: saved.public, sharedBy: saved.sharedBy });
      res.status(200).json({ success: true, data: saved });
    } catch (saveErr) {
      console.error("Error saving design:", saveErr, { id: designId, public: design.public });
      res.status(500).json({ success: false, message: "Failed to save design", error: saveErr });
    }
  } catch (e) {
    console.error("Error setting design public/private (outer catch)", e);
    res.status(500).json({ success: false, message: "Failed to update public status", error: e });
  }
};

// Get all public designs (templates)
exports.getPublicDesigns = async (req, res) => {
  try {
    const templates = await Design.find({ public: true }).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, data: templates });
  } catch (e) {
    console.error("Error fetching public designs", e);
    res.status(500).json({ success: false, message: "Failed to fetch public designs" });
  }
};
