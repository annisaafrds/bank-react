module.exports = (sequelize, Sequelize) => {
    const masterpelangganDB = sequelize.define("MASTERPELANGGAN", {
      idPelanggan: {
        field: 'ID_PELANGGAN',
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        field: 'NAMA',
        type: Sequelize.STRING
      },
      noTelp: {
        field: 'NO_TELP',
        type: Sequelize.INTEGER
      },
      alamat: {
        field: 'ALAMAT',
        type: Sequelize.STRING,
      },
      userId: {
        field: 'USER_ID',
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize, // We need to pass the connection instance
      modelName: 'masterpelangganDB', // We need to choose the model name,
      tableName: 'MASTER_PELANGGAN',
      //freezeTableName: true
    });
  
    masterpelangganDB.associate = function(models) {
      masterpelangganDB.hasMany(models.transaksiTelkomDB, {foreignKey: 'idPelanggan',sourceKey: 'idPelanggan'})
    //   masterpelangganDB.belongsTo(models.deptDB, {foreignKey: 'departmentId'})
    //   masterpelangganDB.belongsTo(models.jobDB, {foreignKey: 'jobId'})
    };
  
      return masterpelangganDB;
    };  