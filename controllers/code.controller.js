const {
  getLangs,
  createSubmission,
  getSubmission,
} = require("../services/code.service");

exports.getLangs = async (req, res) => {
  const result = await getLangs();
  res.status(result.status).json(result.data);
};

exports.createSubmission = async (req, res) => {
  const body = req.body;
  const result = await createSubmission(body);
  res.status(result.status).json(result.data);
};

exports.getSubmission = async (req, res) => {
  const token = req.query.token;
  const result = await getSubmission(token);
  res.status(result.status).json(result.data);
};
