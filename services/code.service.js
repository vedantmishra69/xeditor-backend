const { ERRORS } = require("../lib/constants");

const JUDGE0_API = process.env.JUDGE0_API;
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;
const JUDGE0_HOST = process.env.JUDGE0_HOST;

exports.getLangs = async () => {
  const url = `${JUDGE0_API}/languages`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": JUDGE0_API_KEY,
      "x-rapidapi-host": JUDGE0_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(ERRORS.ERROR_FETCHING);
  }
};
