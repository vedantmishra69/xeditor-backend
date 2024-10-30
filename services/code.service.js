const { makeRequest } = require("../lib/util");

const JUDGE0_API = process.env.JUDGE0_API;
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;
const JUDGE0_HOST = process.env.JUDGE0_HOST;
const BASE64 = false;

exports.getLangs = async () => {
  const url = `${JUDGE0_API}/languages`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": JUDGE0_API_KEY,
      "x-rapidapi-host": JUDGE0_HOST,
    },
  };
  return await makeRequest(url, options);
};

exports.createSubmission = async (body) => {
  const url = `${JUDGE0_API}/submissions?base64_encoded=${BASE64}&wait=false&fields=*`;
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": JUDGE0_API_KEY,
      "x-rapidapi-host": JUDGE0_HOST,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  return await makeRequest(url, options);
};

exports.getSubmission = async (token) => {
  const url = `${JUDGE0_API}/submissions/${token}?base64_encoded=${BASE64}&fields=*`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": JUDGE0_API_KEY,
      "x-rapidapi-host": JUDGE0_HOST,
    },
  };
  return await makeRequest(url, options);
};
