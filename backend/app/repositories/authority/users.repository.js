function usersRepository(db) {
    const getlogin = (condition) => {
        return db.usersDB.findAndCountAll(
            {
                attributes:[
                
                    'username',
                    'nama',
                    'alamat',
                    'email'
                ],
    
                include: [
                    {
                        //through:{
                        attributes:['userId','role_id'//'KODEATASAN',//'MANAGERNAME'
                        ],//},//},
                        include: [
                            {
                                //through:{
                                attributes:['role_id','NAMA'//'KODEATASAN',//'MANAGERNAME'
                                ],
                                
                                include: [
                                    {
                                        //through:{
                                        attributes:['role_menu_id'//'KODEATASAN',//'MANAGERNAME'
                                        ] 
                                        
                                        
                                        ,
                                        include: [
                                            {
                                                //through:{
                                                attributes:['menu_id','nama','icon','url','program_name'//'KODEATASAN',//'MANAGERNAME'
                                                ],//},//},
                                                model: db.menusDB,
                                               as:'MENU', 
                                               required:false,
                                    
                                               //where : {EMPNO : 20 },
                                    
                                            }
                                        ]
                                        

                                        
                                        
                                        ,//},//},
                                        
                                        model: db.roles_menuDB,
                                       as:'ROLES_MENUs', 
                                       required:false,
                            
                                       //where : {EMPNO : 20 },
                            
                                    }
                                ]
        
                                ,//},//},
                                model: db.rolesDB,
                               as:'ROLE', 
                               required:false,
                    
                               //where : {EMPNO : 20 },
                    
                            },
                        ],
                        

                        model: db.hakaksessDB,
                       as:'HAKAKSEs', 
                       required:false,
            
                       //where : {EMPNO : 20 },
            
                    },
                    {
                        attributes:['norek'//'KODEATASAN',//'MANAGERNAME'
                        ],//},//},
                            model: db.mstBankDB,
                        as:'MSTBANKs', 
                        required:false,

                    },
                    {
                        attributes:['idPelanggan'//'KODEATASAN',//'MANAGERNAME'
                        ],//},//},
                            model: db.masterpelangganDB,
                        as:'MASTERPELANGGANs', 
                        required:false,

                    }
                ],
             

                where : {
                    ... condition
                },
                // limit, 
                // offset,
                raw : false,
                nest : true,
                plain: false,
    
            }
            
        )
    }
    return {
        getlogin
    }
            
}
module.exports = usersRepository
