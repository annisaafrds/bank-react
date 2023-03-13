function historyTelkomRepository(db) {
    const getHistoryTelkom = (condition, limit, offset) => {
        return db.historyTelkomDB.findAndCountAll({
            
       attributes:
             [
                'idHistory',
                'idPelanggan',
                'tanggalBayar',
                'bulanTagihan',
                'tahunTagihan',
                'uang' 
             ],
        where : {
         ... condition
        },
        order :[
         'idHistory'
        ],
        limit, 
        offset,
        raw : true,
             nest : true,
             plain: false,
         });
    }

    const insertHistoryTelkom = (historyTelkomData, tr) => {
        
        const inserthistorytelkom= db.historyTelkomDB.create(historyTelkomData,
            {
              transaction:tr
            }
        );
        return inserthistorytelkom
    }
 
    return {
        getHistoryTelkom,
        insertHistoryTelkom
    }
}

module.exports = historyTelkomRepository