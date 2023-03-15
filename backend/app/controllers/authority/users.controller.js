const db = require("../../models");
//const Op = db.Sequelize.Op;
const jsonMessage = require("../../json/jsonMessage");
const usersRepo = require("../../repositories/authority//users.repository")(db);
const { getPagination, getPagingData } = require("../../utils/pagination");
const { condition } = require("sequelize");
exports.login = async (req, res) => {
    //req.body.userid
    try {

    var condition={
       'username':req.body.username,
       'password':req.body.password
    }
    var data = await usersRepo.getlogin(condition)
    console.log("data",data)
    let message = {
        english: `Successfully1 Retrieved Data EMP`,
        //"indonesia" : `Berhasil Mengambil Data EMP`,
        data:data
      };
      res.send(message)
    } catch (err) {
        const errMessage = err.message || "Some error occurred while get Data EMP";
        if (err.original !== undefined) {
          res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
        } else {
          res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
        }
      }
  
}
