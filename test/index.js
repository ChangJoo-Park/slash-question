const request = require('supertest');
const app = require('../app')

request(app)
  .get('/slack')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '2')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });
