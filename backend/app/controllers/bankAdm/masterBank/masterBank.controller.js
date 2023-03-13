const db = require("../../../models");
const jsonMessage = require("../../../json/jsonMessage");
const mstBankRepo = require("../../../repositories/bankAdm/masterBank/masterBank.repository")(db);
const { getPagination, getPagingData } = require("../../../utils/pagination");

exports.getAll = async (req, res) => {
  const { page, size, field, value, type } = req.query;
  try {
    var condition = null;
    const { limit, offset } = getPagination(page - 1, size);

    if (field && value) {
      const params = field;
      condition = { ["$" + params + "$"]: { $like: `%${value}%` } };
    }

    var data = await mstBankRepo.getOptionsMstBank(condition, limit, offset);

    const response = getPagingData(data, page, limit);
    let message = {
      english: `Successfully Retrieved Data Master Bank`,
      //"indonesia" : `Berhasil Mengambil Data EMP`,
    };
    res.send(jsonMessage.jsonSuccess(message, response));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while get Data Master Bank";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
  }
};

exports.getOptionsMstBank = async (req, res) => {
  const { page, size, field, value, type } = req.query;
  try {
    var condition = null;
    const { limit, offset } = getPagination(page - 1, size);

    if (field && value) {
      const params = field;
      condition = { [params]: { $like: `%${value}%` } };
    }

    var data = await mstBankRepo.getOptionsMstBank(condition, limit, offset);

    const response = getPagingData(data, page, limit);
    let message = {
      english: `Successfully Retrieved Data Master Bank`,
      //"indonesia" : `Berhasil Mengambil Data EMP`,
    };
    res.send(jsonMessage.jsonSuccess(message, response));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while get Data Master Bank";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
  }
};

exports.getByNorek = async (req, res) => {
  
  const { value } = req.query;
  try {
    var condition = null;
    //const { limit, offset } = getPagination(page - 1, size);

//    const Op = db.Sequelize.Op;
    //const norek = parseInt(req.query.norek)
    
      condition = { ["norek"]: `${value}`  };

    console.log("condition",condition)
    var data = await mstBankRepo.getOptionsMstBank(condition);
    
    //const response = getPagingData(data, page, limit);
  
    let message = {
      english: `Successfully Retrieved Data Master Bank`,
      //"indonesia" : `Berhasil Mengambil Data EMP`,
    };
    res.send(data)

    //res.send(jsonMessage.jsonSuccess(message, response));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while get Data Master Bank";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
  }
};

exports.getMstBank = async (req, res) => {
  const { page, size, field, value } = req.query;
  try {
    var condition = null;
    const { limit, offset } = getPagination(page - 1, size);

    if (field && value) {
      console.log("field", field);
      const params = field;
      //       var strArray = params.split(".");
      ///var params1=""; var params2=""
      //params1=strArray[0];params2=strArray[1];
      console.log("condition");
      if (process.env.DIALECT === "oracle") {
        //console.log('params1',params1);

        //console.log('params2',params2);

        condition = { [field]: { $like: `%${value}%` } };

        //console.log('condition',condition)
      } else {
        const Op = db.Sequelize.Op;
        condition = { [params]: { [Op.ilike]: `%${value}%` } };
      }
    }
    var data = await mstBankRepo.getOptionsMstBank(condition, limit, offset);

    /*    
      for (intLoop=0;intLoop<=data.rows.length-1;intLoop++)
      {
        var subData = await empRepo.getManagerRecursive(
          data.rows[intLoop])

        data.rows[intLoop]=subData;
        ///console.log("subData",subData,intLoop)
//        console.log(intLoop,data.rows[intLoop])

      }/**/
    //console.log("data",data)
    const response = getPagingData(data, page, limit);
    let message = {
      english: `Successfully Retrieved Data Master Bank`,
      //"indonesia" : `Berhasil Mengambil Data EMP`,
    };
    res.send(jsonMessage.jsonSuccess(message, response));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while get Data Master Bank";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
  }
};
exports.insertMstBank = async (req, res) => {
  const tr = await db.sequelize.transaction();
  let hireDateParm = Date.parse(req.body.hireDate);
  //console.log("hireDate",hireDateParm)
  try {
    var dataMstBank = {
      norek: req.body.norek,
      nama: req.body.nama,
      alamat: req.body.alamat,
      noTelp: req.body.noTelp,
      saldo: req.body.saldo,
      userId: req.body.userId,
    };

    const tempIMst = await mstBankRepo.insertMstBank(dataMstBank, tr);
    //console.log("tempIEmp",tempIEmp)
    let message = {
      english: `Successfully Insert Master Bank`,
      indonesia: `Berhasil Input Master Bank`,
    };
    await tr.commit();
    res.send(jsonMessage.jsonSuccess(message, tempIMst));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while input Master Bank";
    if (err.original !== undefined) {
      console.log("err.original.code", err.original.code);
      console.log("err.message", err.message);
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
    await tr.rollback();
  }
};

exports.updateMstBank = async (req, res) => {
  const tr = await db.sequelize.transaction();
  try {
    var dataMstBank = {
        norek: req.body.norek,
        nama: req.body.nama,
        alamat: req.body.alamat,
        noTelp: req.body.noTelp,
        saldo: req.body.saldo,
        userId: req.body.userId,
      };
    const tempIMst = await mstBankRepo.updateMstBank(req.body.norek, dataMstBank, tr);
    let message = {
      english: `Successfully Update Master Bank`,
      indonesia: `Berhasil Update Master Bank`,
    };
    await tr.commit();
    res.send(jsonMessage.jsonSuccess(message, tempIMst));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while input Master Bank";
    if (err.original !== undefined) {
      console.log("err.original.code", err.original.code);
      console.log("err.message", err.message);
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
    await tr.rollback();
  }
};

exports.deleteMstBank = async (req, res) => {
    const tr = await db.sequelize.transaction();
    try {
      console.log('req.body.norek',req.body.norek)
      const tempIMst = await mstBankRepo.deleteMstBank(req.body.norek, tr);
      let message = {
        english: `Successfully Update Master Bank`,
        indonesia: `Berhasil Update Master Bank`,
      };
      await tr.commit();
      res.send(jsonMessage.jsonSuccess(message, tempIMst));
    } catch (err) {
      const errMessage = err.message || "Some error occurred while input Master Bank";
      if (err.original !== undefined) {
        console.log("err.original.code", err.original.code);
        console.log("err.message", err.message);
        res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
      } else {
        res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
      }
      await tr.rollback();
    }
  };