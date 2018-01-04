process.env.NODE_ENV  = 'test';;

let mongoose          = require('mongoose');
let models            = require('../models');
let UserAccountRequest= models.UserAccountRequest;

//Require the dev-dependencies
let chai                = require('chai');
let chaiHttp            = require('chai-http');
let server              = require('../../server');
let should              = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('User', () => {
    beforeEach((done) => { //Before each test we empty the database
        UserAccountRequest.remove({}, (err) => {
           done();
        });
    });
/*
  * Test the /GET route
*/
  describe('/GET user from UserAccountRequest', () => {
      it('it should GET all the users from UserAccountRequest', (done) => {
        chai.request(server)
            .get('/api/v1/UserAccountRequest')
            .end((err, res) => {
              // console.log('res:----- ',res);
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
  describe('/POST user for UserAccountRequest', () => {
      it('it should not POST a UserAccountRequest without required fields', (done) => {
        let user = {
          "name": "hello",
          "email": "hello@g.com",
          "phone": "9999999999"
          }
        chai.request(server)
            .post('/api/v1/UserAccountRequest')
            .send(user)
            .end((err, res) => {
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
  describe('/GET/:id UserAccountRequest', () => {
      it('it should GET a user by the given id for UserAccountRequest', (done) => {
        let user = new UserAccountRequest({ name: "hiha", email: "av@yahoo.com", phone: "9090909090"});
        user.save((err, user) => {
            chai.request(server)
            .get('/api/v1/UserAccountRequest/' + user.id)
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

  // /*
  //   * Test the /DELETE/:id route
  // */
  describe('/DELETE/:id UserAccountRequest', () => {
    it('it should DELETE a user by the given id from UserAccountRequest', (done) => {
      let user = new UserAccountRequest({ name: "hiha", email: "av@yahoo.com", phone: "9090909090" });
      user.save((err, user) => {
        chai.request(server)
        .delete('/api/v1/UserAccountRequest/' + user._id)
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
