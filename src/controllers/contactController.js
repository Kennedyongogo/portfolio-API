const Contact = require("../models/Contact");
const { Op } = require("sequelize");

// Create a new Contact message
exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({ error: "Error sending message" });
  }
};

// Get all Contact messages
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      where: { isActive: true },
      order: [["createdAt", "DESC"]],
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
};

// Get a Contact message by ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: "Error fetching message" });
  }
};

// Update a Contact message
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Message not found" });
    }

    await contact.update(req.body);
    res.json({
      message: "Message updated successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating message" });
  }
};

// Delete a Contact message (Soft delete)
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Message not found" });
    }

    await contact.update({ isActive: false });
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting message" });
  }
};

// Mark message as read
exports.markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Message not found" });
    }

    await contact.update({ isRead: true });
    res.json({ message: "Message marked as read" });
  } catch (error) {
    res.status(500).json({ error: "Error marking message as read" });
  }
};

// Get unread messages
exports.getUnreadMessages = async (req, res) => {
  try {
    const messages = await Contact.findAll({
      where: {
        isRead: false,
        isActive: true,
      },
      order: [["createdAt", "DESC"]],
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching unread messages" });
  }
};

// Search messages
exports.searchMessages = async (req, res) => {
  try {
    const { query } = req.query;
    const messages = await Contact.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { email: { [Op.iLike]: `%${query}%` } },
          { subject: { [Op.iLike]: `%${query}%` } },
          { message: { [Op.iLike]: `%${query}%` } },
        ],
        isActive: true,
      },
      order: [["createdAt", "DESC"]],
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error searching messages" });
  }
};
