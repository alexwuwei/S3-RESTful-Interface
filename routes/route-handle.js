'use strict';
var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
var s3 = new AWS.S3();  //revise
var params = {Bucket: 'user-file-bucket', Key: } //revise
var fs = require('fs');



module.exports = (middleRouter, models) => {
  let User = models.User;
  let File = models.File;

  middleRouter.route('/users')
  .get((req, res) => {
    console.log('GET route hit for /users');
    User.find({}).populate('files').exec((err, users) => {
      res.json({data: users});
    });
  })
  .post((req, res) => {
    console.log('POST route hit for /users');
    var newUser = new User(req.body);
    newUser.save((err, user) => {
      res.json(user);
    });
  });

  //routes for users/:user

  middleRouter.route('/users/:user')
  .get((req, res) => {
    console.log('GET route hit for /users/:user');
    User.findById(req.params.id, (err, user) => {
      res.json(user);
    })
  })
  .put((req, res) => {
    console.log('PUT route hit for /users/:user');
    User.findByIdAndUpdate({id: req.params.id}, req.body, (err, user) => {
      if (err) return res.send(err);
      res.json(customer);
    });
  })
  .delete((req, res) => {
    console.log('DEL route hit for /users/:user');
    User.findById(req.params.id, (err, user) => {
      user.remove((err, customer) => {
        res.json({message: 'customer removed'});
      })
    })
  });

  //routes for users/:user/files

  middleRouter.route('/users/:user/files')
  .get((req, res) => {
    console.log('GET route hit for /users/:user/files');
    User.findById(req.params.id, (err, user) => {
      res.json(user.files);
    })

  })
  .post((req, res) => {
    console.log('POST route hit for /users/:user/files');
    fs.writeFile('./data/' + req.body.fileName, req.body.content, (err) => {
      console.log('file written as ./data/' + req.body.fileName + ' with content: ' + req.body.content);
    });
    var params = {Bucket: 'user-file-bucket', Key: req.body.fileName, Body: req.body.content};
    s3.putObject(params, (err, data) => {
      if (err) console.log(err);
      console.log('successfully sent data to s3. data is: ' + data);
    });
    var url = s3.getSignedUrl('objectName', params, (err, url) => { //revise objectName, find actual name
      console.log('url is ' + url); //revise, maybe put all new file and push to user in here. if so, get rid of var.
    })
    var newFile = new File(req.body);
    newFile.save((err, file) => {
      User.findById(req.params.id, (err, user) => {
        user.files.push(file._id); //test
      });
      res.json(url); //change
    });
  });

  //routes for /files/:file

  middleRouter.route('/files/:file')
  .get((req, res) => {
    console.log('GET route hit for /files/:file');
    File.findById(req.params.id, (err, file) => {
      res.json(file);
    });
  })
  .put((req, res) => {
    console.log('PUT route hit for /files/:file');
    File.findByIdAndUpdate(req.params.id, req.body, (err, file) => {
      if (err) return res.send(err);
      res.json(file);
    })
  })
  .delete((req, res) => {
    console.log('DEL route hit for /files/:file');
    File.findById(req.params.id, (err, file) => {
      file.remove((err, product) => {
        res.json({message: 'file removed'})
      });
    });
  });
}

//use getSignedUrl to get a url from s3 http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-examples.html
