const db = require("../../models");
//const Op = db.Sequelize.Op;
const jsonMessage = require("../../json/jsonMessage");
const trnasabahRepo = require("../../repositories/tr-nasabah/trnasabah.repository")(db);
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

        var data = await trnasabahRepo.gettrnasabah(condition, limit, offset);

        const response = getPagingData(data, page, limit);
        let message = {
            english: `Successfully Retrieved Data trnasabah`,
            //"indonesia" : `Berhasil Mengambil Data trnasabah`,
        };
        res.send(jsonMessage.jsonSuccess(message, response));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while get Data trnasabah";
        if (err.original !== undefined) {
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
        }
    }
};

exports.getOptionstrnasabah = async (req, res) => {
    const { page, size, field, value, type } = req.query;
    try {
        var condition = null;
        const { limit, offset } = getPagination(page - 1, size);

        if (field && value) {
            const params = field;
            condition = { [params]: { $like: `%${value}%` } };
        }

        var data = await trnasabahRepo.getOptionstrnasabah(condition, limit, offset);

        const response = getPagingData(data, page, limit);
        let message = {
            english: `Successfully Retrieved Data trnasabah`,
            //"indonesia" : `Berhasil Mengambil Data trnasabah`,
        };
        res.send(jsonMessage.jsonSuccess(message, response));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while get Data trnasabah";
        if (err.original !== undefined) {
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
        }
    }
};

exports.gettrnasabah = async (req, res) => {
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
        var data = await trnasabahRepo.gettrnasabah(condition, limit, offset);

        /*    
          for (intLoop=0;intLoop<=data.rows.length-1;intLoop++)
          {
            var subData = await trnasabahRepo.getManagerRecursive(
              data.rows[intLoop])
    
            data.rows[intLoop]=subData;
            ///console.log("subData",subData,intLoop)
    //        console.log(intLoop,data.rows[intLoop])
    
          }/**/
        //console.log("data",data)
        const response = getPagingData(data, page, limit);
        let message = {
            english: `Successfully Retrieved Data trnasabah`,
            //"indonesia" : `Berhasil Mengambil Data trnasabah`,
        };
        res.send(jsonMessage.jsonSuccess(message, response));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while get Data trnasabah";
        if (err.original !== undefined) {
            res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, "30"));
        } else {
            res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, "30"));
        }
    }
};
exports.inserttrnasabah = async (req, res) => {
    const tr = await db.sequelize.transaction();
    let hireDateParm = Date.parse(req.body.hireDate);
    //console.log("hireDate",hireDateParm)
    try {
        // const getmax = await trnasabahRepo.getMax();
        var datatrnasabah = {
            // trnasabahinsiId: getmax.trnasabah + 1,
            idTransaksiNasabah: req.body.idTransaksiNasabah,
            norek: req.body.norek,
            tanggal: req.body.tanggal,
            status: req.body.status,
            uang: req.body.uang,
            statusKet: req.body.statusKet,
            norekDituju: req.body.norekDituju,
            nomorTlp: req.body.nomorTlp
        };

        const tempItrnasabah = await trnasabahRepo.inserttrnasabah(datatrnasabah, tr);
        //console.log("tempItrnasabah",tempItrnasabah)
        let message = {
            english: `Successfully Insert trnasabah`,
            indonesia: `Berhasil Input trnasabah`,
        };
        await tr.commit();
        res.send(jsonMessage.jsonSuccess(message, tempItrnasabah));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while input trnasabah";
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
exports.deletetrnasabah = async (req, res) => {
    const tr = await db.sequelize.transaction();
    try {
        console.log("req.body.trnasabahinsiId", req.body.idTransaksiNasabah);
        const tempItrnasabah = await trnasabahRepo.deletetrnasabah(req.body.idTransaksiNasabah, tr);
        let message = {
            english: `Successfully Delete trnasabah`,
            indonesia: `Berhasil Hapus trnasabah`,
        };
        await tr.commit();
        res.send(jsonMessage.jsonSuccess(message, tempItrnasabah));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while input trnasabah";
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

exports.updatetrnasabah = async (req, res) => {
    const tr = await db.sequelize.transaction();
    try {
        var datatrnasabahinsi = {
            idTransaksiNasabah: req.body.idTransaksiNasabah,
            norek: req.body.norek,
            tanggal: req.body.tanggal,
            status: req.body.status,
            uang: req.body.uang,
            statusKet: req.body.statusKet,
            norekDituju: req.body.norekDituju,
            nomorTlp: req.body.nomorTlp
        };
        const tempItrnasabah = await trnasabahRepo.updatetrnasabah(req.body.idTransaksiNasabah, datatrnasabahinsi, tr);
        let message = {
            english: `Successfully Update trnasabah`,
            indonesia: `Berhasil Update trnasabah`,
        };
        await tr.commit();
        res.send(jsonMessage.jsonSuccess(message, tempItrnasabah));
    } catch (err) {
        const errMessage = err.message || "Some error occurred while input trnasabah";
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

exports.findBayarTelepon = async (req, res) => {
    const { page, size, field, value } = req.query;
    try {
        var condition = null;
        const { limit, offset } = getPagination(page - 1, size);

        if (field !== null && value !== null) {
            const params = field;
            if (process.env.DIALECT === "oracle") {
                condition = { [field]: { $like: `%${value}%` } };
            } else {
                const Op = db.Sequelize.Op;
                const norek = parseInt(req.query.norek, req.body.nomorTlp)
                condition = req.query
            }
        }
        var data = await trnasabahRepo.getOptionstrnasabah(condition, limit, offset);

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

exports.getTotalTagihan = async (req, res) => {
    const { page, size, field, value } = req.query;
    try {
        var condition = null;
        const { limit, offset } = getPagination(page - 1, size);

        if (field !== null && value !== null) {
            const params = field;
            if (process.env.DIALECT === "oracle") {
                condition = { [field]: { $like: `%${value}%` } };
            } else {
                const Op = db.Sequelize.Op;
                const norek = parseInt(req.query.norek, req.body.nomorTlp)
                condition = req.query
            }
        }
        var data = await trnasabahRepo.getOptionstrnasabah(condition, limit, offset);

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
