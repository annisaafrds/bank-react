module.exports = (sequelize, Sequelize) => {
  const mstBankDB = sequelize.define("MSTBANK", {
    norek: {
      primaryKey: true,
      field: 'NOREK',
      type: Sequelize.INTEGER
    },
    nama: {
      field: 'NAMA',
      type: Sequelize.STRING
    },
    alamat: {
      field: 'ALAMAT',
      type: Sequelize.STRING,
    },
    noTelp: {
      field: 'NOTLP',
      type: Sequelize.INTEGER,
    },
    saldo: {
      field: 'SALDO',
      type: Sequelize.INTEGER,
    },
    userId: {
      field: 'USER_ID',
      type: Sequelize.INTEGER,
    },
  }, {
    sequelize, // We need to pass the connection instance
    modelName: 'mstBankDB', // We need to choose the model name,
    tableName: 'MASTER_BANK'
  });
  mstBankDB.associate = function (models) {
    mstBankDB.hasMany(models.trnasabahDB, { foreignKey: 'norek', sourceKey: 'norek' })
    mstBankDB.belongsTo(models.usersDB,{foreignKey: 'userId' })

  };

  return mstBankDB;
};

