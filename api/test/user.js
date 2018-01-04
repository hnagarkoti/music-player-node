//During the test the env variable is set to test
process.env.NODE_ENV    = 'test';

let mongoose            = require("mongoose");
let models              = require('../models');
let User                = models.User;

//Require the dev-dependencies
let chai                = require('chai');
let chaiHttp            = require('chai-http');
let server              = require('../../server');
let should              = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('User', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => {
           done();
        });
    });
/*
  * Test the /GET route
*/
  describe('/GET user', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/v1/user')
            .end((err, res) => {
              console.log(res.body);
                res.body.success.should.be.equal(true);
                res.body.message.should.be.equal('Success');
                res.body.data.should.be.a('array');
              done();
            });
      });
  });

  /*
    * Test the /POST route
  */
  describe('/POST user', () => {
      it('it should not POST a user without required fields', (done) => {
        let user = {
          	"name": "hemant",
          	"email": "test@test.com",
          	"password": "hello1",
            "email": "let@g.com",
          	"phone": "9012727328",
          	"userRole": "superadmin",
            "company": "58eb8880b8caec01e65c7c55"
          }
        chai.request(server)
            .post('/api/v1/user')
            .send(user)
            .end((err, res) => {
              console.log('res:--- ', res);
              res.body.success.should.be.equal(true);
              res.body.message.should.be.equal('Success');
              res.body.data.should.be.a('object');
              res.body.data.should.have.property('_id');
              done();
            });
      });
  });

  /*
    * Test the /GET/:id route
  */
  describe('/GET/:id user', () => {
      it('it should GET a user by the given id', (done) => {
        let user = new User({ name: "hiha", email: "av@yahoo.com", password: "hemantnagarkoti", phone: "9090909090", userRole: "superadmin" });
        user.save((err, user) => {
            chai.request(server)
            .get('/api/v1/user/' + user.id)
            .send(user)
            .end((err, res) => {
                res.body.success.should.be.equal(true);
                res.body.message.should.be.equal('Success');
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('name');
                res.body.data.should.have.property('email');
                res.body.data.should.have.property('_id').eql(user.id);
              done();
            });
        });
      });
  });

  /*
    * Test the /DELETE/:id route
  */
  describe('/DELETE/:id user', () => {
    it('it should DELETE a user by the given id', (done) => {
      let user = new User({ name: "hiha", email: "av@yahoo.com", password: "hemantnagarkoti", phone: "9090909090", userRole: "superadmin" });
      user.save((err, user) => {
        chai.request(server)
        .delete('/api/v1/user/' + user._id)
        .send(user)
        .end((err, res) => {
          res.body.success.should.be.equal(true);
          res.body.message.should.be.equal('Success');
          done();
        })
      })
    })
  })
});
