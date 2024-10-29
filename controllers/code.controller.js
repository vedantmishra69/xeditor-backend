const { getLangs } = require("../services/code.service");

exports.getLangs = async (req, res) => {
  try {
    const languages = await getLangs();
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
