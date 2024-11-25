const { Server } = require("@hocuspocus/server");
const { Database } = require("@hocuspocus/extension-database");
const supabase = require("./supabase");

const server = Server.configure({
  extensions: [
    new Database({
      fetch: async ({ documentName }) => {
        console.log("in fetch");
        console.log(documentName);
        return new Promise(async (res, rej) => {
          const { data, error } = await supabase
            .from("user_docs")
            .select("y_doc")
            .eq("id", documentName);
          if (error) {
            console.log("e1", error);
            rej(error);
          } else {
            console.log("d1", data[0].y_doc.data);
            res(new Uint8Array(data[0].y_doc.data));
          }
        });
      },
      store: async ({ documentName, state }) => {
        console.log("in store");
        const { data, error } = await supabase
          .from("user_docs")
          .update({ y_doc: state })
          .eq("id", documentName);
        if (error) console.log("e2", error);
        else console.log("d2", data);
      },
    }),
  ],
});

module.exports = server;
