module.exports = (app) => {
    const mstBank = require("../../../controllers/bankAdm/masterBank/masterBank.controller");
    

    var router = require("express").Router();
    router.get("/", mstBank.getAll);
    router.get("/getByNorek", mstBank.getByNorek);
    router.post("/insert", mstBank.insertMstBank);
    router.put("/update", mstBank.updateMstBank);
    router.delete("/del", mstBank.deleteMstBank)
    app.use("/api/mst-bank/", router);
  };
  