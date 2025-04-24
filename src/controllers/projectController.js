const Project = require("../models/Project");
const { Op } = require("sequelize");

// Create a new Project
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating project" });
  }
};

// Get all Projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { isActive: true },
      order: [["date", "DESC"]],
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Error fetching projects" });
  }
};

// Get a Project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Error fetching project" });
  }
};

// Update a Project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    await project.update(req.body);
    res.json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating project" });
  }
};

// Delete a Project (Soft delete)
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    await project.update({ isActive: false });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting project" });
  }
};

// Get Featured Projects
exports.getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: {
        featured: true,
        isActive: true,
      },
      order: [["date", "DESC"]],
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Error fetching featured projects" });
  }
};

// Search Projects
exports.searchProjects = async (req, res) => {
  try {
    const { query } = req.query;
    const projects = await Project.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
          { technologies: { [Op.contains]: [query] } },
        ],
        isActive: true,
      },
      order: [["date", "DESC"]],
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Error searching projects" });
  }
};
