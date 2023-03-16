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
                        attributes:['user_id','role_id'//'KODEATASAN',//'MANAGERNAME'
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
                                                attributes:['menu_id','nama','icon','url'//'KODEATASAN',//'MANAGERNAME'
                                                ],//},//},
                                                model: db.menusDB,
                                               as:'MENUs', 
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
                        as:'MENUs', 
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
