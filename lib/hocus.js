const { Server } = require("@hocuspocus/server");
const { Database } = require("@hocuspocus/extension-database");
const { Logger } = require("@hocuspocus/extension-logger");
const supabase = require("./supabase");
const logger = require("./logger");

const extensions = [
  new Database({
    fetch: async ({ documentName }) => {
      return new Promise(async (res, rej) => {
        const { data, error } = await supabase
          .from("user_docs")
          .select("y_doc")
          .eq("id", documentName);
        if (error) {
          logger.log({
            level: "error",
            message: "Error in doc fetching",
            doc_id: documentName,
            error,
          });
          rej(error);
        } else {
          logger.info("Doc fetched successfully %s", documentName);
          res(new Uint8Array(data[0]?.y_doc?.data));
        }
      });
    },
    store: async ({ documentName, state }) => {
      const { data, error } = await supabase
        .from("user_docs")
        .update({ y_doc: state })
        .eq("id", documentName);
      if (error)
        logger.log({
          level: "error",
          message: "Error in doc storing",
          doc_id: documentName,
          error,
        });
      else logger.info("Doc stored successfully %s", documentName);
    },
  }),
];

// Only add Logger in production
if (process.env.NODE_ENV !== "production") {
  extensions.unshift(new Logger());
}

const server = Server.configure({
  onAuthenticate: async ({ token }) => {
    const jwt = token?.split("Bearer ")[1];
    if (!jwt) {
      throw new Error("No token provided");
    }
    const { data, error } = await supabase.auth.getUser(jwt);
    if (error || !data?.user) {
      throw new Error("Invalid or expired token");
    }
    return { user_id: data?.user?.id };
  },
  extensions,
});

module.exports = server;
