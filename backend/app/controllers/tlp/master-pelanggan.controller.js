const db = require("../../models");
//const Op = db.Sequelize.Op;
const jsonMessage = require("../../json/jsonMessage");
const masterpelangganRepo = require("../../repositories/tlp/master-pelanggan.repository")(db);
const { getPagination, getPagingData } = require("../../utils/pagination");

exports.getAll = async (req, res) => {
  const { page, size, field, value, type } = req.query;
  try {
    var condition = null;
    const { limit, offset } = getPagination(page - 1, size);

    if (field && value) {
      const params = field;
      condition = { ["$" + params + "$"]: { $like: `%${value}%` } };
    }

    var data = await masterpelangganRepo.getMasterPelanggan(condition, limit, offset);

    const response = getPagingData(data, page, limit);
    let message = {
      english: `Successfully Retrieved Data MASTER PELANGGAN`,
      //"indonesia" : `Berhasil Mengambil Data MASTER PELANGGAN`,
    };
    res.send(jsonMessage.jsonSuccess(message, response));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while get Data MASTER PELANGGAN";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
  }
};

exports.getOptionsMasterPelanggan = async (req, res) => {
  const { page, size, field, value, type } = req.query;
  try {
    var condition = null;
    const { limit, offset } = getPagination(page - 1, size);

    if (field && value) {
      const params = field;
      console.log("value",value);
      condition = { [params]: `${value}` } ;
    }
    console.log("condition2",condition);

    var data = await masterpelangganRepo.getOptionsMasterPelanggan(condition, limit, offset);

    const response = getPagingData(data, page, limit);
    let message = {
      english: `Successfully Retrieved Data MASTER PELANGGAN`,
      //"indonesia" : `Berhasil Mengambil Data MASTER PELANGGAN`,
    };
    res.send(jsonMessage.jsonSuccess(message, response));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while get Data MASTER PELANGGAN";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
  }
};

exports.getMasterPelanggan = async (req, res) => {
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
      console.log("condition2", value);
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
    console.log("condition3", condition);
    var data = await masterpelangganRepo.getMasterPelanggan(condition, limit, offset);

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
      english: `Successfully Retrieved Data MASTER PELANGGAN`,
      //"indonesia" : `Berhasil Mengambil Data MASTER PELANGGAN`,
    };
    res.send(jsonMessage.jsonSuccess(message, response));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while get Data MASTER PELANGGAN";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
  }
};

exports.insertMasterPelanggan = async (req, res) => {
  const tr = await db.sequelize.transaction();
  let hireDateParm = Date.parse(req.body.hireDate);
  //console.log("hireDate",hireDateParm)
  try {
    // const getmax = await kelurahanRepo.getMax();
    var dataMasterPelanggan = {
        // idPelanggan: getmax.emp + 1,
        idPelanggan: req.body.idPelanggan,
        nama: req.body.nama,
        noTelp: req.body.noTelp,
        alamat: req.body.alamat,
        userId: req.body.userId,
    };

    const tempIMasterPelanggan = await masterpelangganRepo.insertMasterPelanggan(dataMasterPelanggan, tr);
    //console.log("tempIMasterPelanggan",tempIMasterPelanggan)
    let message = {
      english: `Successfully Insert MASTER PELANGGAN`,
      indonesia: `Berhasil Input MASTER PELANGGAN`,
    };
    await tr.commit();
    res.send(jsonMessage.jsonSuccess(message, tempIMasterPelanggan));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while input MASTER PELANGGAN";
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

exports.deleteMasterPelanggan = async (req, res) => {
  const tr = await db.sequelize.transaction();
  try {
    console.log("req.body.idPelanggan", req.body.idPelanggan);
    const tempIMasterPelanggan = await masterpelangganRepo.deleteMasterPelanggan(req.body.idPelanggan, tr);
    let message = {
      english: `Successfully Update MASTER PELANGGAN`,
      indonesia: `Berhasil Update MASTER PELANGGAN`,
    };
    await tr.commit();
    res.send(jsonMessage.jsonSuccess(message, tempIMasterPelanggan));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while input MASTER PELANGGAN";
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

exports.updateMasterPelanggan = async (req, res) => {
  const tr = await db.sequelize.transaction();
  try {
    var dataMasterPelanggan = {
        idPelanggan: req.body.idPelanggan,
        nama: req.body.nama,
        noTelp: req.body.noTelp,
        alamat: req.body.alamat,
        userId: req.body.userId,
    };
    const tempIMasterPelanggan = await masterpelangganRepo.updateMasterPelanggan(req.body.idPelanggan, dataMasterPelanggan, tr);
    let message = {
      english: `Successfully Update MASTER PELANGGAN`,
      indonesia: `Berhasil Update MASTER PELANGGAN`,
    };
    await tr.commit();
    res.send(jsonMessage.jsonSuccess(message, tempIMasterPelanggan));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while input MASTER PELANGGAN";
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
/*
exports.getDetail = async (req, res) => {
  const {id} = req.params;
  const tr = await db.sequelize.transaction();

  try {
    if (name === null) {
      let message = {
        "english": 'You are not Authorized',
        "indonesia": `Anda Tidak Memiliki Hak Akses`,
      }
      res.send(jsonMessage.jsonSuccess(message, []));
    } else {
      let myData = await registrasiAssRepo.getDetail(id)
      let message = {
        "english": `Successfully Retrieved Data Detail Stock`,
        "indonesia": `Berhasil Mengambil Data Detail Stock`,
      }
      await tr.commit();
      res.send(jsonMessage.jsonSuccess(message, myData[0]));
    }
  } catch (err) {
    // /console.log('449 err :>> ', err);
    const errMessage = err.message || "Some error occurred while Retrieving Detail Stock";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
    }
    await tr.rollback();
  }
}
*/