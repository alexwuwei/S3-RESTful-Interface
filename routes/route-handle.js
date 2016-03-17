'use strict';
let User = require(__dirname + '/../models/users-model');
let File = require(__dirname + '/../models/files-model');

module.exports = (middleRouter) => {
  middleRouter.route('/users')
  .get((req, res) => {
    console.log('GET route hit for /users');
  })
  .post((req, res) => {
    console.log('POST route hit for /users');
  });

  middleRouter.route('/users/:user')
  .get((req, res) => {
    console.log('GET route hit for /users/:user');
  })
  .put((req, res) => {
    console.log('PUT route hit for /users/:user');
  })
  .delete((req, res) => {
    console.log('DEL route hit for /users/:user');
  })

  middleRouter.route('/users/:user/files')
  .get((req, res) => {
    console.log('GET route hit for /users/:user/files');
  })
  .post((req, res) => {
    console.log('POST route hit for /users/:user/files');
  });

  middleRouter.route('/files/:file')
  .get((req, res) => {
    console.log('GET route hit for /files/:file');
  })
  .put((req, res) => {
    console.log('PUT route hit for /files/:file');
  })
  .delete((req, res) => {
    console.log('DEL route hit for /files/:file');
  })
}
