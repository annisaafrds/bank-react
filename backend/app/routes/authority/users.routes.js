module.exports = (app) => {
    const usersController = require("../../controllers/authority/users.controller");
    
    var router = require("express").Router();
    router.post("/login", usersController.login);
    //router.post("/insert", histBank.insertHistory);
    //router.put("/update", histBank.updateHistory);
    //router.delete("/del", histBank.deleteHistory)
    app.use("/authority", router);
  };
