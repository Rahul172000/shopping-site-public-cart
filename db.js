const mysql2=require('mysql2')
const sequelize=require('sequelize');
const db=new sequelize('sql12299005','sql12299005','JstrwZIlrG',{
    host:'sql12.freemysqlhosting.net',
    dialect:'mysql',
    pool:{
        min:0,
        max:5,
    }
})

const connection = mysql2.createConnection({
    host: 'sql12.freemysqlhosting.net',
    database: 'sql12299005',
    user: 'sql12299005',
    password: 'JstrwZIlrG'
})
function remove_data(id){
    const suc="REMOVED SUCCESSFULLY";
    const fail="CANNOT BE REMOVED...TRY AGAIN LATER";
    let msg;
    connection.query(
        `DELETE FROM carts WHERE id=${id}`,
        function(err,result){

        }
    )
}
const products=db.define('products',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    product_name:{
        type:sequelize.STRING,
        allowNULL:false,
    },
    product_manufacturer:{
        type:sequelize.STRING,
        allownull:false,
    },
    product_price:{
        type:sequelize.INTEGER,
        allowNULL:false,
    },
})
const cart=db.define('cart',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    product_name:{
        type:sequelize.STRING,
        allowNULL:false,
    },
    product_manufacturer:{
        type:sequelize.STRING,
        allownull:false,
    },
    product_price:{
        type:sequelize.INTEGER,
        allowNULL:false,
    },
})
db.sync()
.then(()=>console.log('database created'))
module.exports={
    products,cart,remove_data
}