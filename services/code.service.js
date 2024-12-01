const { makeRequest } = require("../lib/util");

const JUDGE0_API = process.env.JUDGE0_API;
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;
const BASE64 = true;

exports.getLangs = async () => {
  const url = `${JUDGE0_API}/languages`;
  const options = {
    method: "GET",
    headers: {
      "X-AUTH-TOKEN": JUDGE0_API_KEY,
    },
  };
  return await makeRequest(url, options);
};

exports.createSubmission = async (body) => {
  const url = `${JUDGE0_API}/submissions?base64_encoded=${BASE64}&wait=false&fields=*`;
  const options = {
    method: "POST",
    headers: {
      "X-AUTH-TOKEN": JUDGE0_API_KEY,
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
      "X-AUTH-TOKEN": JUDGE0_API_KEY,
    },
  };
  return await makeRequest(url, options);
};
