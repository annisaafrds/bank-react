function mstBankRepository(db) {


    const getOptionsMstBank = (condition, limit, offset) => {
        return db.mstBankDB.findAndCountAll({
            attributes:[
                'norek',
                'nama',
                'alamat',
                'noTelp',
                'saldo',
                'userId'
            ],
            where : {
                ... condition
            },
            // limit, 
            // offset,
            raw : true,
            nest : true,
            plain: false,

        });
    }

    const insertMstBank = (mstBankData, tr) => {
        
        const insertmstBank= db.mstBankDB.create(mstBankData,
            {
              transaction:tr
            }
        );
        return insertmstBank
    }

    const updateMstBank=(norekPrm,mstBankData,tr)=>{
        const updatemstBank= db.mstBankDB.update(mstBankData,
            {
                where: {
                    norek: norekPrm,
                },
 
              transaction:tr
            }
         );
         return updatemstBank

    }

    const deleteMstBank=(norekPrm,tr)=>{
        
        const deletemstBank= db.mstBankDB.destroy(
            {
                where: {
                    norek: norekPrm,
                },
 
              transaction:tr
            }
         );
         return deletemstBank

    }
 
    return {
        getOptionsMstBank,
        insertMstBank,
        updateMstBank,
        deleteMstBank
    }
}


module.exports = mstBankRepository