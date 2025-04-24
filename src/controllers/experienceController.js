const Experience = require("../models/Experience");
const { Op } = require("sequelize");

// Create a new Experience
exports.createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({
      message: "Experience created successfully",
      experience,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating experience" });
  }
};

// Get all Experiences
exports.getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.findAll({
      where: { isActive: true },
      order: [["startDate", "DESC"]],
    });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: "Error fetching experiences" });
  }
};

// Get an Experience by ID
exports.getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id);
    if (!experience) {
      return res.status(404).json({ error: "Experience not found" });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: "Error fetching experience" });
  }
};

// Update an Experience
exports.updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id);
    if (!experience) {
      return res.status(404).json({ error: "Experience not found" });
    }

    await experience.update(req.body);
    res.json({
      message: "Experience updated successfully",
      experience,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating experience" });
  }
};

// Delete an Experience (Soft delete)
exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id);
    if (!experience) {
      return res.status(404).json({ error: "Experience not found" });
    }

    await experience.update({ isActive: false });
    res.json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting experience" });
  }
};

// Get Experiences by Company
exports.getExperiencesByCompany = async (req, res) => {
  try {
    const { company } = req.query;
    const experiences = await Experience.findAll({
      where: {
        company: { [Op.iLike]: `%${company}%` },
        isActive: true,
      },
      order: [["startDate", "DESC"]],
    });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: "Error fetching experiences by company" });
  }
};

// Get Current Experience
exports.getCurrentExperience = async (req, res) => {
  try {
    const experience = await Experience.findOne({
      where: {
        endDate: null,
        isActive: true,
      },
      order: [["startDate", "DESC"]],
    });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: "Error fetching current experience" });
  }
};
