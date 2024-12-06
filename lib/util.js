const { ERRORS } = require("./constants");
const logger = require("./logger");

exports.makeRequest = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return { status: response.status, data: result };
  } catch (error) {
    logger.log({
      level: "error",
      message: "Error in lib/util/makeRequest()",
      error: error.message,
      stack: error.stack,
    });
    return { status: 500, data: { error: ERRORS.ERROR_FETCHING } };
  }
};
