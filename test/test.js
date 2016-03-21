var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var request = chai.request;
var http = require('http');
// require('../server.js');
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

describe('testing routes for /users/:user resource', () => {
  it('should hit a GET route for /users/:user', (done) => {
    request('localhost:3000')
    .get('/users/56ef155c289e4d7e8fd16133')
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.text).to.include('name');
      done();
    });
  });
  it('should hit a PUT route for /users/:user', (done) => {
    request('localhost:3000')
    .put('/users/56f0270ef419ed340cf97156') //revise
    .send({"name":"a new test person"}) //revise
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      done();
    });
  });
});

//users/:user/files tests

describe('testing routes for users/:user/files', () => {
  it('should hit a GET route for users/:user/files', (done) => {
    request('localhost:3000')
    .get('/users/56ef155c289e4d7e8fd16133/files')
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should hit a POST route for users/:user/files', (done) => {
    request('localhost:3000')
    .post('/users/56ef155c289e4d7e8fd16133/files')
    .send({"fileName":"mocha test file", "content":"hello"})
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      done();
    });
  });
});

//files/:file testing

describe('testing routes for files/:file', () => {
  it('should hit a GET route for files/:file', (done) => {
    request('localhost:3000')
    .get('/files/56ef345244efb7c5047f0c8e')
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('object');
      done();
    });
  });
  it('should hit a PUT route for files/:file', (done) => {
    request('localhost:3000')
    .put('/files/56ef345244efb7c5047f0c8e')
    .send({"fileName":"changed file", "content": "some other content"})
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      done();
    });
  });
});
