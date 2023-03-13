const db = require("../../../models");
const jsonMessage = require("../../../json/jsonMessage");
const histRepo = require("../../../repositories/history/history.repository")(db);
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

    var data = await histRepo.getOptionshistory(condition, limit, offset);

    const response = getPagingData(data, page, limit);
    let message = {
      english: `Successfully Retrieved Data History Bank`,
      //"indonesia" : `Berhasil Mengambil Data EMP`,
    };
    res.send(jsonMessage.jsonSuccess(message, response));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while get Data History Bank";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
  }
};

exports.getOptionshistory = async (req, res) => {
  const { page, size, field, value, type } = req.query;
  try {
    var condition = null;
    const { limit, offset } = getPagination(page - 1, size);

    if (field && value) {
      const params = field;
      condition = { [params]: { $like: `%${value}%` } };
    }

    var data = await mstBankRepo.getOptionshistory(condition, limit, offset);

    const response = getPagingData(data, page, limit);
    let message = {
      english: `Successfully Retrieved Data History Bank`,
      //"indonesia" : `Berhasil Mengambil Data EMP`,
    };
    res.send(jsonMessage.jsonSuccess(message, response));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while get Data History Bank";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
  }
};

exports.getHistory = async (req, res) => {
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
    var data = await mstBankRepo.getOptionshistory(condition, limit, offset);

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
      english: `Successfully Retrieved Data History Bank`,
      //"indonesia" : `Berhasil Mengambil Data EMP`,
    };
    res.send(jsonMessage.jsonSuccess(message, response));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while get Data History Bank";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
  }
};
exports.insertHistory = async (req, res) => {
  const tr = await db.sequelize.transaction();
  //console.log("hireDate",hireDateParm)
  try {
    var dataHist = {
      tanggal: req.body.tanggal,
      norek: req.body.norek,
      statusKet: req.body.statusKet,
      nama: req.body.nama,
      uang: req.body.uang,
      norekDituju: req.body.norekDituju,
      nomorTlp: req.body.nomorTlp
    };

    const tempIMst = await histRepo.inserthistory(dataHist, tr);
    //console.log("tempIEmp",tempIEmp)
    let message = {
      english: `Successfully Insert History Bank`,
      indonesia: `Berhasil Input History Bank`,
    };
    await tr.commit();
    res.send(jsonMessage.jsonSuccess(message, tempIMst));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while input History Bank";
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

exports.updateHistory = async (req, res) => {
  const tr = await db.sequelize.transaction();
  try {
    var dataHist = {
        idHistoryBank: req.body.idHistoryBank,
        tanggal: req.body.tanggal,
        norek: req.body.norek,
        statusKet: req.body.statusKet,
        nama: req.body.nama,
        uang: req.body.uang,
        norekDituju: req.body.norekDituju,
        nomorTlp: req.body.nomorTlp
      };
    const tempIMst = await histRepo.updatehistory(req.body.idHistoryBank, dataHist, tr);
    let message = {
      english: `Successfully Update Master Bank`,
      indonesia: `Berhasil Update Master Bank`,
    };
    await tr.commit();
    res.send(jsonMessage.jsonSuccess(message, tempIMst));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while update History Bank";
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

exports.deleteHistory = async (req, res) => {
    const tr = await db.sequelize.transaction();
    try {
      const tempIMst = await histRepo.deletehistory(req.body.idHistoryBank, tr);
      let message = {
        english: `Successfully Delete History Bank`,
        indonesia: `Berhasil Hapus History Bank`,
      };
      await tr.commit();
      res.send(jsonMessage.jsonSuccess(message, tempIMst));
    } catch (err) {
      const errMessage = err.message || "Some error occurred while delete History Bank";
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