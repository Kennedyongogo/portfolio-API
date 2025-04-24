const Skill = require("../models/Skill");
const { Op } = require("sequelize");

// Create a new Skill
exports.createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({
      message: "Skill created successfully",
      skill,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating skill" });
  }
};

// Get all Skills
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll({
      where: { isActive: true },
      order: [
        ["category", "ASC"],
        ["proficiency", "DESC"],
      ],
    });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: "Error fetching skills" });
  }
};

// Get a Skill by ID
exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: "Error fetching skill" });
  }
};

// Update a Skill
exports.updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }

    await skill.update(req.body);
    res.json({
      message: "Skill updated successfully",
      skill,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating skill" });
  }
};

// Delete a Skill (Soft delete)
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }

    await skill.update({ isActive: false });
    res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting skill" });
  }
};

// Get Skills by Category
exports.getSkillsByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const skills = await Skill.findAll({
      where: {
        category: { [Op.iLike]: `%${category}%` },
        isActive: true,
      },
      order: [["proficiency", "DESC"]],
    });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: "Error fetching skills by category" });
  }
};

// Get Top Skills
exports.getTopSkills = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const skills = await Skill.findAll({
      where: { isActive: true },
      order: [["proficiency", "DESC"]],
      limit: parseInt(limit),
    });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: "Error fetching top skills" });
  }
};
