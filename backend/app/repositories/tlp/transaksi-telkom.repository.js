function transaksiTelkomRepository(db) {
    const getOptionsTransaksiTelkom = (condition, limit, offset) => {  
        return db.transaksiTelkomDB.findAndCountAll({
            attributes:[
                'idTransaksi',
                'idPelanggan',
                'bulanTagihan',
                'tahunTagihan',
                'uang',
                'status'
      ],
            where : {
                ... condition
            },
            raw : true,
        });
    }

    const getTransaksiTelkom = (condition, limit, offset) => {
        return db.transaksiTelkomDB.findAndCountAll({
            
       attributes:
             [
                 'idTransaksi',
                 'idPelanggan',
                 'bulanTagihan',
                 'tahunTagihan',
                 'uang',
                 'status' 
             ],
        include: [
        {
            //through:{
            attributes:['nama'//'KODEATASAN',//'MANAGERNAME'
            ],//},//},
            model: db.masterpelangganDB,
            as:'MASTERPELANGGAN', 
            required:false,

            //where : {EMPNO : 20 },

        }],
        where : {
         ... condition
        },
        order :[
         'idTransaksi'
        ],
        // limit, 
        offset,
        raw : true,
             nest : true,
             plain: false,
         });
    }

    const getMax=()=>
    {
        
        try{
            const max= db.transaksiTelkomDB.findAll({
                attributes: [
                    [db.sequelize.fn('MAX', db.sequelize.literal('ID_TRANSAKSI')),"transaksiTelkom"]
                ],       
                raw : true,
                nest : true,
                plain: true,
    
              }) ;
              return max;
    
          }catch(err)
        {
            const errMessage = err.message || "Some error occurred while input TRANSAKSI_TELKOM";
            if(err.original !== undefined) {
                console.log("err.original.code",err.original.code);
                console.log("err.message",err.message);
                res.send(jsonMessage.jsonFailed(err.original.code, err.original.errno, errMessage, '30'));
            } else {
                res.send(jsonMessage.jsonFailed("Not Define", "Not Define", errMessage, '30'));
            }
        }
            
    }
    const insertTransaksiTelkom = (transaksiTelkomData, tr) => {
        
        const inserttransaksitelkom= db.transaksiTelkomDB.create(transaksiTelkomData,
            {
              transaction:tr
            }
        );
        return inserttransaksitelkom
    }

    //db.transaksiTelkomDB.create
    const updateTransaksiTelkom=(transaksiTelkomIdPrm,transaksiTelkomData,tr)=>{
        const updatetransaksitelkom= db.transaksiTelkomDB.update(transaksiTelkomData,
            {
                where: {
                    idTransaksi: transaksiTelkomIdPrm,
                },
 
              transaction:tr
            }
         );
         return updatetransaksitelkom

    }

    const deleteTransaksiTelkom=(transaksiTelkomIdPrm,tr)=>{
        
        const deleteTransaksiTelkom= db.transaksiTelkomDB.destroy(
            {
                where: {
                    idTransaksi: transaksiTelkomIdPrm,
                },
 
              transaction:tr
            }
         );
         return deleteTransaksiTelkom

    }
 
    return {
        getOptionsTransaksiTelkom,
        insertTransaksiTelkom,
        getTransaksiTelkom,
        getMax,
        updateTransaksiTelkom,
        deleteTransaksiTelkom
    }
}

module.exports = transaksiTelkomRepository