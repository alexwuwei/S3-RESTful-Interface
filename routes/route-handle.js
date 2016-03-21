'use strict';
var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
var s3 = new AWS.S3();  //revise
var fs = require('fs');
// var bodyParser = require('body-parser');



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
    User.findById(req.params.user).populate('files').exec((err, user) => {
      res.json(user);
    });
  })
  .put((req, res) => {
    console.log('PUT route hit for /users/:user');
    User.findByIdAndUpdate(req.params.user, req.body, (err, user) => {
      if (err) return res.send(err);
      res.json(user);
    });
  })
  .delete((req, res) => {
    console.log('DEL route hit for /users/:user');
    User.findById({_id: req.params.user}).populate('files').exec((err, user) => {
      if(user.files) {
      user.files.forEach((file) => {
        let params = {
          Bucket: 'user-file-bucket',
          Key: file.fileName
        };
        s3.deleteObject(params, (err, data) => {
          if (err) console.log(err);
          console.log(data);
        });
        file.remove((err, file) => {
          console.log('file ' + file + ' was removed');
        });
      });
      }
      user.remove((err, user) => {
        res.json({message: 'user removed'});
      });
    });
  });

  //routes for users/:user/files

  middleRouter.route('/users/:user/files')
  .get((req, res) => {
    console.log('GET route hit for /users/:user/files');
    User.findById({_id: req.params.user}).populate('files').exec((err, user) => {
      if(!user) {
        res.send('user doesnt exist!!!');
      };
      res.json({
        data: user.files
      });
      res.end();
    });
  })

  .post((req, res) => {
    console.log('POST route hit for /users/:user/files');
    fs.writeFile('./data/' + req.body.fileName, req.body.content, (err) => {
      console.log('file written as ./data/' + req.body.fileName + ' with content: ' + req.body.content);
    });
    var params = {
      Bucket: 'user-file-bucket',
      Key: req.body.fileName,
      ACL: 'public-read-write',
      Body: JSON.stringify(req.body.content)};
    s3.putObject(params, (err, data) => {
      if (err) console.log(err);
      console.log('successfully sent data to s3. data is: ' + data);
    });
    s3.getSignedUrl('getObject', {Bucket: 'user-file-bucket', Key: req.body.fileName}, (err, url) => {
      var newFile = new File({fileName: req.body.fileName, content: req.body.content, url: url});
      newFile.save((err, file) => {
        console.log('new file created, file is ' + file);
        User.findByIdAndUpdate(req.params.user, { $push: {files: file._id}} , (err, user) => {
          console.log(file._id + ' pushed for user: ' + req.params.user);
          res.json({message:'file posted successfully'});
        });
      });
    });
  });

  //route for /files
  middleRouter.route('/files')
  .get((req, res) => {
    console.log('GET route hit for /files');
    File.find({}).exec((err, files) => {
      res.json({data: files});
    });
  });

  //routes for /files/:file

  middleRouter.route('/files/:file')
  .get((req, res) => {
    console.log('GET route hit for /files/:file');
    File.findById(req.params.file, (err, file) => {
      res.json({'file_url': file.url});
    });
  })
  .put((req, res) => {
    console.log('PUT route hit for /files/:file');
    File.findByIdAndUpdate(req.params.file, req.body, (err, file) => {
      if (err) return res.send(err);
      res.json(file);
    });
  })
  .delete((req, res) => {
    console.log('DEL route hit for /files/:file');
    File.findById(req.params.file, (err, file) => {
      let params = {
        Bucket: 'user-file-bucket',
        Key: file.fileName
      };
      s3.deleteObject(params, (err, data) => {
        if (err) console.log(err);
        console.log('file: ' + data + ' was removed');
      });
      file.remove((err, file) => {
        res.json({message: 'file removed'});
      });
    });
  });
};
