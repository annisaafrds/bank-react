const db = require("../../models");
const jsonMessage = require("../../json/jsonMessage");
const historyTelkomRepo = require("../../repositories/tlp/history-telkom.repository")(db);
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

    var data = await historyTelkomRepo.getHistoryTelkom(condition, limit, offset);

    const response = getPagingData(data, page, limit);
    let message = {
      english: `Successfully Retrieved Data HISTORY_TELKOM`,
    };
    res.send(jsonMessage.jsonSuccess(message, response));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while get Data HISTORY_TELKOM";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
  }
};

exports.getHistoryTelkom = async (req, res) => {
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
    var data = await historyTelkomRepo.getHistoryTelkom(condition, limit, offset);

    const response = getPagingData(data, page, limit);
    let message = {
      english: `Successfully Retrieved Data HISTORY_TELKOM`,
    };
    res.send(jsonMessage.jsonSuccess(message, response));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while get Data HISTORY_TELKOM";
    if (err.original !== undefined) {
      res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
    } else {
      res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
    }
  }
};

exports.insertHistoryTelkom = async (req, res) => {
  const tr = await db.sequelize.transaction();
  try {
    console.log(req.body);
    var dataTransaksiTelkom = {
      idHistory: req.body.idHistory,
      idPelanggan: req.body.idPelanggan,
      tanggalBayar: req.body.tanggalBayar,
      bulanTagihan: req.body.bulanTagihan,
      tahunTagihan: req.body.tahunTagihan,
      uang: req.body.uang
    };

    const tempIHistoryTelkom = await historyTelkomRepo.insertHistoryTelkom(dataHistoryTelkom, tr);
    let message = {
      english: `Successfully Insert HISTORY_TELKOM`,
      indonesia: `Berhasil Input HISTORY_TELKOM`,
    };
    await tr.commit();
    res.send(jsonMessage.jsonSuccess(message, tempIHistoryTelkom));
  } catch (err) {
    const errMessage = err.message || "Some error occurred while input HISTORY_TELKOM";
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