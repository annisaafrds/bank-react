module.exports = (app) => {
    const masterpelanggan = require("../../controllers/tlp/master-pelanggan.controller");
    // const keycloak = require('../../config/keycloak.config').initKeycloak();
  
    var router = require("express").Router();
  
    router.get("/", masterpelanggan.getAll);
    // router.get("/OrMysql",  emp.getOrMysqlAll)
    router.get("/getMasterPelanggan", masterpelanggan.getMasterPelanggan);
    router.get("/getById", masterpelanggan.getById);
    router.get("/getOptionsMasterPelanggan", masterpelanggan.getOptionsMasterPelanggan);
    router.post("/save", masterpelanggan.insertMasterPelanggan);
    router.put("/update", masterpelanggan.updateMasterPelanggan);
    router.delete("/delete", masterpelanggan.deleteMasterPelanggan);
    app.use("/api/masterpelanggan/", router);
  };