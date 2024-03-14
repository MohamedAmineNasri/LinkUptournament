require('dotenv').config({ path: '.env.test' });

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const Product = require('../Models/match');

const mongoose = require('mongoose');


chai.use(chaiHttp);




describe('Test', () => {





it('should POST a valid product', (done) => {
        
    let product = {
        name: "Test Product",
        startingtime: "10h",
        type: "idk"
    }
    chai.request(server)
    .post('/match')
    .send(product)
    .end((err, res) => {
        res.should.have.status(201);
        
        done();

    });

});

});
