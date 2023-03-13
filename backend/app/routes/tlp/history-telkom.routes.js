module.exports = (app) => {
  const historyTelkom = require("../../controllers/tlp/history-telkom.controller.js");

  var router = require("express").Router();

  router.get("/", historyTelkom.getAll);
  router.get("/getHistoryTelkom", historyTelkom.getHistoryTelkom);
  router.post("/save", historyTelkom.insertHistoryTelkom);

  app.use("/api/history-telkom/", router);
};
