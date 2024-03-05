require('dotenv').config({ path: '.env.test' });

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const Product = require('../product');

const mongoose = require('mongoose');


chai.use(chaiHttp);




describe('Test', () => {





it('should POST a valid product', (done) => {
        
    let product = {
        name: "Test Product",
        price: 100,
        quantity: 20
    }
    chai.request(server)
    .post('/api/products')
    .send(product)
    .end((err, res) => {
        res.should.have.status(201);
        
        done();

    });

});

});