module.exports = (app) => {
  const transaksiTelkom = require("../../controllers/tlp/transaksi-telkom.controller.js");

  var router = require("express").Router();

  router.get("/", transaksiTelkom.getAll);
  router.get("/getTransaksiTelkom", transaksiTelkom.getTransaksiTelkom);
  router.get("/getOptionsTransaksiTelkom", transaksiTelkom.getOptionsTransaksiTelkom);
  router.post("/save", transaksiTelkom.insertTransaksiTelkom);
  router.put("/update", transaksiTelkom.updateTransaksiTelkom);
  router.delete("/delete", transaksiTelkom.deleteTransaksiTelkom);

  app.use("/api/transaksi-telkom/", router);
};
