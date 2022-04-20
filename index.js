const serverless = require('serverless-http');
const express = require('express');
const ProductService = require('./service/productService');
const { response } = require('express');
const UserService = require('./service/userService');
const OrderService = require('./service/orderService');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ===============================================User===========================================================
// https://esoug68jcf.execute-api.us-east-1.amazonaws.com/stage1/createuser
// let req = {"email":"rachna.jaju@forcepoint.com","fname":"rachna","lname":"jaju","pwd":"Admin@123"}
app.post('/api/register', async(req, res) => {
    userService = new UserService();
    let response = await userService.register(req.body);
    console.log(response);
    res.send(response);
});

// https://rbro9zlco6.execute-api.us-east-1.amazonaws.com/stage1/userlogin?email=rachna.jaju%40forcepoint.com&pwd=Admin%40123
// email=rachna.jaju%40forcepoint.com&pwd=Admin%40123
app.get('/api/userlogin', async(req, res) => {
    userService = new UserService();
    let response = await userService.login(req.query.email, req.query.pwd);
    console.log(response);
    res.send(response);
});

// ===============================================Product===========================================================
// https://d30vitmbo1.execute-api.us-east-1.amazonaws.com/stage1/createeditproduct
// let req = {"data":{"price":"10","prod_name":"KitKat","quantity_available":"1000","supplier_email":"sunil.kamble@forcepoint.com"}};
app.post('/api/createeditproduct', async(req, res) => {
    productService = new ProductService();
    let response = await productService.createeditproduct(req.body);
    console.log(response);
    res.send(response);
});
// https://78s2h5gkg3.execute-api.us-east-1.amazonaws.com/stage1/getalliproducts?email=sunil.kamble%40forcepoint.com&tab=market
// email=sunil.kamble%40forcepoint.com&tab=market
app.get('/api/getalliproducts', async(req, res) => {
    productService = new ProductService();
    let response = await productService.getalliproducts(req.query.email, req.query.tab);
    console.log(response);
    res.send(response);
});
// https://qk9eq9mpke.execute-api.us-east-1.amazonaws.com/stage1/deleteproduct?email=sunil.kamble%40forcepoint.com&item_id=114
// email=sunil.kamble%40forcepoint.com&item_id=114
app.delete('/api/deleteproduct', async(req, res) => {
    productService = new ProductService();
    let response = await productService.deleteproduct(req.query.email, req.query.item_id);
    console.log(response);
    res.send(response);
});

// ===============================================Order===========================================================

// https://v2bbyu7y28.execute-api.us-east-1.amazonaws.com/stage1/orderitem/
// let req = {"data":{"email":"sunil.kamble@forcepoint.com","item_id":"113","order_status":"ordered","quantity":"2"}};
app.post('/api/orderitem', async(req, res) => {
    orderService = new OrderService();
    let request = { "supplier_email": req.body.email, "item_id": req.body.item_id, "order_status": req.body.order_status, "quantity": req.body.quantity };
    let response = await orderService.orderitem(request);
    console.log(response);
    res.send(response);
});
// https://950za1oi60.execute-api.us-east-1.amazonaws.com/stage1/getordereditems?email=sunil.kamble%40forcepoint.com
app.get('/api/getordereditems', async(req, res) => {
    orderService = new OrderService();
    let response = await orderService.getordereditems(req.query.email);
    console.log(response);
    res.send(response);
});


app.listen(3000, () => console.log(`Listening on: 3000`));
module.exports.handler = serverless(app);