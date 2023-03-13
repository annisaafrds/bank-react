module.exports = (app) => {
    const trnasabah = require("../../controllers/tr-nasabah/trnasabah.controller.js");
    // const keycloak = require('../../config/keycloak.config').initKeycloak();

    var router = require("express").Router();

    router.get("/", trnasabah.getAll);
    // router.get("/OrMysql",  emp.getOrMysqlAll)
    router.get("/gettrnasabah", trnasabah.gettrnasabah);
    router.get("/getOptionstrnasabah", trnasabah.getOptionstrnasabah);
    router.post("/inserttrnasabah", trnasabah.inserttrnasabah);

    //router.post("/",  emp.insertEmp);
    router.put("/updatetrnasabah", trnasabah.updatetrnasabah);
    router.delete("/deletetrnasabah", trnasabah.deletetrnasabah);
    router.get("/findBayarTelepon", trnasabah.findBayarTelepon);
    router.get("/getTotalTagihan", trnasabah.getTotalTagihan);
    app.use("/api/trnasabah/", router);
};
