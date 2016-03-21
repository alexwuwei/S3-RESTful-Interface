var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var request = chai.request;
var http = require('http');
require('../server.js');
var User = require('../models/users-model');
var File = require('../models/files-model');

describe('testing routes for /users resource', () => {
  it('should hit a GET route for /customers', (done) => {
    request('localhost:3000')
    .get('/users')
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('object');
      done();
    });
  });
  it('should hit a POST route for /users', (done) => {
    request('localhost:3000')
    .post('/users')
    .send({"name":"testPerson"})
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      expect(res.body).to.have.property('name');
      done();
    });
  });
});
