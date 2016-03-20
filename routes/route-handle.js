'use strict';

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
