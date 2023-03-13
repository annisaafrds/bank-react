module.exports = (sequelize, Sequelize) => {
  const historyTelkomDB = sequelize.define("HISTTELKOM", {
    idHistory: {
      field: 'ID_HISTORY',
      // autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    idPelanggan: {
      field: 'ID_PELANGGAN',
      type:Sequelize.INTEGER,
    },  
    tanggalBayar: {
      field: 'TANGGAL_BAYAR',
      type: Sequelize.DATE,
    },
    bulanTagihan: {
      field: 'BULAN_TAGIHAN',
      type: Sequelize.INTEGER
    },
    tahunTagihan: {
      field: 'TAHUN_TAGIHAN',
      type: Sequelize.INTEGER
    },
    uang: {
      field: 'UANG',
      type: Sequelize.INTEGER
    }
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: 'historyTelkomDB', // We need to choose the model name,
    tableName: 'HISTORY_TELKOM',
    //freezeTableName: true
  });

  // transaksiTelkomDB.associate = function(models) {
  //   transaksiTelkomDB.belongsTo(models.transaksiTelkomDB, {foreignKey: 'idPelanggan',sourceKey: 'idPelanggan'})
  // };

    return historyTelkomDB;
  };

