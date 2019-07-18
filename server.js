const express=require('express');
const server=express();
const prod_db=require('./db.js').products
const cart_db=require('./db.js').cart
const remove=require('./db.js').remove_data
const server_port=process.env.PORT||1111
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use('/',express.static(__dirname+'/public/home_shop'));
server.use('shopping-site-public-cart.herokuapp.com/cartpage',express.static(__dirname+'/public/cart'))
server.get('/allprod',function(req,res){
    prod_db.findAll()
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{res.send('PRODUCTS CANNOT BE FETCHED')})
})
server.get('/allcartprod',function(req,res){
    cart_db.findAll()
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{res.send("PRODUCTS CANNOT BE FETCHED")})
})
server.get('/findprod',function(req,res){
    prod_db.findOne({
        where:{
            id:req.query.id
        }
    }).then(product=>{return res.send(product)})
    .catch(err=>{res.send(err);})
})
server.use('/addprod',express.static(__dirname+'/public/add_new'))
server.post('/addprod/data',function(req,res){
    prod_db.create({
        product_name:req.body.name,
        product_manufacturer:req.body.manuf,
        product_price:req.body.price,
    }).then(newobject=>{
        res.send("PRODUCT CREATED")
    })
    .catch(err=>{res.send("PRODUCT CANNOT BE ADDED")})
})
server.post('/addtocart',function(req,res){
    cart_db.create({
        id:req.body.id,
        product_name:req.body.name,
        product_manufacturer:req.body.manuf,
        product_price:req.body.price,        
    }).then(newobject=>{
        return res.send("ADDED TO CART")
    })
    .catch(err=>{res.send("PRODUCT CANNOT BE ADDED TO CART")})
})
server.post('/removefromcart',function(req,res){
    console.log(remove(req.body.id));
    res.send("done");
    /*cart_db.destroy({
        where:{
            id:req.query.id,
        }
    }).then(res=>{res.send("DELETED FROM CART")})
    .catch(err=>{res.send("CANNOT BE DELETED NOW...TRY AGAIN LATER")})*/
})
server.listen(server_port,function(){
    console.log("server started");
})