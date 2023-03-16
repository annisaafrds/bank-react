const db = require("../../models");
const jsonMessage = require("../../json/jsonMessage");
const transaksiTelkomRepo = require("../../repositories/tlp/transaksi-telkom.repository")(db);
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

    var data = await transaksiTelkomRepo.getTransaksiTelkom(condition, limit, offset);

    const response = getPagingData(data, page, limit);
    let message = {
      english: `Successfully Retrieved Data TRANSAKSI_TELKOM`,
    };
    res.send(jsonMessage.jsonSuccess(message, response));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while get Data TRANSAKSI_TELKOM";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
  }
};

exports.getOptionsTransaksiTelkom = async (req, res) => {
  const { page, size, field, value, type } = req.query;
  try {
    var condition = null;
    const { limit, offset } = getPagination(page - 1, size);

    if (field && value) {
      const params = field;
      condition = { [params]: { $like: `%${value}%` } };
    }

    var data = await transaksiTelkomRepo.getOptionsTransaksiTelkom(condition, limit, offset);

    const response = getPagingData(data, page, limit);
    let message = {
      english: `Successfully Retrieved Data TRANSAKSI_TELKOM`
    };
    res.send(jsonMessage.jsonSuccess(message, response));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while get Data TRANSAKSI_TELKOM";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
  }
};

exports.getTransaksiTelkom = async (req, res) => {
  const { page, size, field, value } = req.query;
  try {
    var condition = null;
    const { limit, offset } = getPagination(page - 1, size);

    if (field && value) {
      console.log("field", field);
      const params = field;
      console.log("condition");
      if (process.env.DIALECT === "oracle") {
        condition = { [field]: { $like: `%${value}%` } };
      } else {
        const Op = db.Sequelize.Op;
        condition = { [params]: { [Op.ilike]: `%${value}%` } };
      }
    }
    var data = await transaksiTelkomRepo.getTransaksiTelkom(condition, limit, offset);

    const response = getPagingData(data, page, limit);
    let message = {
      english: `Successfully Retrieved Data TRANSAKSI_TELKOM`,
    };
    res.send(jsonMessage.jsonSuccess(message, response));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while get Data TRANSAKSI_TELKOM";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
  }
};
exports.insertTransaksiTelkom = async (req, res) => {
  const tr = await db.sequelize.transaction();
  try {
    console.log(req.body);
    var dataTransaksiTelkom = {
      idTransaksi: req.body.idTransaksi,
      idPelanggan: req.body.idPelanggan,
      bulanTagihan: req.body.bulanTagihan,
      tahunTagihan: req.body.tahunTagihan,
      uang: req.body.uang,
      status: req.body.status
    };

    const tempITransaksiTelkom = await transaksiTelkomRepo.insertTransaksiTelkom(dataTransaksiTelkom, tr);
    let message = {
      english: `Successfully Insert TRANSAKSI_TELKOM`,
      indonesia: `Berhasil Input TRANSAKSI_TELKOM`,
    };
    await tr.commit();
    res.send(jsonMessage.jsonSuccess(message, tempITransaksiTelkom));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while input TRANSAKSI_TELKOM";
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
exports.deleteTransaksiTelkom = async (req, res) => {
  const tr = await db.sequelize.transaction();
  try {
    console.log("req.query.idTransaksi", req.query.idTransaksi);
    const tempITransaksiTelkom = await transaksiTelkomRepo.deleteTransaksiTelkom(req.query.idTransaksi, tr);
    let message = {
      english: `Successfully Delete TRANSAKSI_TELKOM`,
      indonesia: `Berhasil Delete TRANSAKSI_TELKOM`,
    };
    await tr.commit();
    res.send(jsonMessage.jsonSuccess(message, tempITransaksiTelkom));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while input TRANSAKSI_TELKOM";
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

exports.updateTransaksiTelkom = async (req, res) => {
  const tr = await db.sequelize.transaction();
  try {
    var dataTransaksiTelkom = {
      idTransaksi: req.body.idTransaksi,
      idPelanggan: req.body.idPelanggan,
      bulanTagihan: req.body.bulanTagihan,
      tahunTagihan: req.body.tahunTagihan,
      uang: req.body.uang,
      status: req.body.status,
    };
    const tempITransaksiTelkom = await transaksiTelkomRepo.updateTransaksiTelkom(req.body.idTransaksi, dataTransaksiTelkom, tr);
    let message = {
      english: `Successfully Update TRANSAKSI_TELKOM`,
      indonesia: `Berhasil Update TRANSAKSI_TELKOM`,
    };
    await tr.commit();
    res.send(jsonMessage.jsonSuccess(message, tempITransaksiTelkom));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while input TRANSAKSI_TELKOM";
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

exports.getById = async (req, res) => {
  
  const { value } = req.query;
  try {
    var condition = null;
    //const { limit, offset } = getPagination(page - 1, size);

//    const Op = db.Sequelize.Op;
    //const norek = parseInt(req.query.norek)
    
      condition = { ["idTransaksi"]: `${value}`  };

    console.log("condition",condition)
    var data = await transaksiTelkomRepo.getTransaksiTelkom(condition);
    
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