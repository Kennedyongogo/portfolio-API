const Education = require("../models/Education");
const { Op } = require("sequelize");

// Create a new Education
exports.createEducation = async (req, res) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json({
      message: "Education created successfully",
      education,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating education" });
  }
};
// Get all Education
exports.getAllEducation = async (req, res) => {
  try {
    const education = await Education.findAll({
      where: { isActive: true },
      order: [["startDate", "DESC"]],
    });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: "Error fetching education" });
  }
};

// Get an Education by ID
exports.getEducationById = async (req, res) => {
  try {
    const education = await Education.findByPk(req.params.id);
    if (!education) {
      return res.status(404).json({ error: "Education not found" });
    }
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: "Error fetching education" });
  }
};

// Update an Education
exports.updateEducation = async (req, res) => {
  try {
    const education = await Education.findByPk(req.params.id);
    if (!education) {
      return res.status(404).json({ error: "Education not found" });
    }

    await education.update(req.body);
    res.json({
      message: "Education updated successfully",
      education,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating education" });
  }
};

// Delete an Education (Soft delete)
exports.deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByPk(req.params.id);
    if (!education) {
      return res.status(404).json({ error: "Education not found" });
    }

    await education.update({ isActive: false });
    res.json({ message: "Education deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting education" });
  }
};

// Get Education by Institution
exports.getEducationByInstitution = async (req, res) => {
  try {
    const { institution } = req.query;
    const education = await Education.findAll({
      where: {
        institution: { [Op.iLike]: `%${institution}%` },
        isActive: true,
      },
      order: [["startDate", "DESC"]],
    });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: "Error fetching education by institution" });
  }
};

// Get Latest Education
exports.getLatestEducation = async (req, res) => {
  try {
    const education = await Education.findOne({
      where: {
        isActive: true,
      },
      order: [["endDate", "DESC"]],
    });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: "Error fetching latest education" });
  }
};
