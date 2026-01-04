import Footer from "../models/footer.model.js";

export const getFooter = async (req, res) => {
  const footer = await Footer.findOne();
  res.json(footer);
};

export const saveFooter = async (req, res) => {
  let footer = await Footer.findOne();

  if (footer) {
    footer = await Footer.findByIdAndUpdate(footer._id, req.body, { new: true });
  } else {
    footer = await Footer.create(req.body);
  }

  res.json(footer);
};
