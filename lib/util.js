const { ERRORS } = require("./constants");

exports.makeRequest = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return { status: response.status, data: result };
  } catch (error) {
    console.log(error);
    return { status: 500, data: { error: ERRORS.ERROR_FETCHING } };
  }
};
