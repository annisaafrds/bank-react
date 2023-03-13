module.exports = (sequelize, Sequelize) => {
  const transaksiTelkomDB = sequelize.define("TRTELKOM", {
    idTransaksi: {
      field: 'ID_TRANSAKSI',
      // autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    idPelanggan: {
      field: 'ID_PELANGGAN',
      type:Sequelize.INTEGER,
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
    },
    status: {
      field: 'STATUS',
      type: Sequelize.INTEGER,
    }
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: 'transaksiTelkomDB', // We need to choose the model name,
    tableName: 'TRANSAKSI_TELKOM',
    //freezeTableName: true
  });

  // transaksiTelkomDB.associate = function(models) {
  //   transaksiTelkomDB.belongsTo(models.transaksiTelkomDB, {foreignKey: 'idPelanggan',sourceKey: 'idPelanggan'})
  // };

    return transaksiTelkomDB;
  };

