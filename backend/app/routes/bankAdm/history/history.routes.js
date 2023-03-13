module.exports = (app) => {
    const histBank = require("../../../controllers/bankAdm/history/history.controller");
    
    var router = require("express").Router();
    router.get("/", histBank.getAll);
    router.post("/insert", histBank.insertHistory);
    router.put("/update", histBank.updateHistory);
    router.delete("/del", histBank.deleteHistory)
    app.use("/api/hist-bank", router);
  };
  