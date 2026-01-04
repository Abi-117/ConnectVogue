import CompanyContact from "../models/CompanyContact.js";

// GET contact details
export const getCompanyContact = async (req, res) => {
  const contact = await CompanyContact.findOne();
  res.json(contact);
};

// CREATE / UPDATE contact details (admin)
export const upsertCompanyContact = async (req, res) => {
  const data = req.body;

  let contact = await CompanyContact.findOne();

  if (contact) {
    contact = await CompanyContact.findByIdAndUpdate(contact._id, data, {
      new: true,
    });
  } else {
    contact = await CompanyContact.create(data);
  }

  res.json({ success: true, contact });
};
