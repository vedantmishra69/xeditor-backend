const { Server } = require("@hocuspocus/server");
const { Database } = require("@hocuspocus/extension-database");
const { Logger } = require("@hocuspocus/extension-logger");
const supabase = require("./supabase");
const logger = require("./logger");

const server = Server.configure({
  extensions: [
    new Logger(),
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
            res(new Uint8Array(data[0].y_doc.data));
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
  ],
});

module.exports = server;
