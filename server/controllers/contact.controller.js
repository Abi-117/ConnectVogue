import ContactMessage from "../models/ContactMessage.js";

// POST - save contact
export const createContact = async (req, res) => {
  try {
    const contact = await ContactMessage.create(req.body);
    res.status(201).json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET - admin view
export const getAllContacts = async (req, res) => {
  const contacts = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(contacts);
};

// DELETE - admin delete
export const deleteContact = async (req, res) => {
  await ContactMessage.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
