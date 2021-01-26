const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const got = require('got');
const assert = chai.assert;
const url = 'http://127.0.0.1:5000';

chai.use(chaiHttp);

// Init server
describe('Configuration server', () => {
  it('OK response', () => {
    chai.request(url)
    .get('/')
    .end((err, res) => {
      expect(res).to.have.status(200);
    });
  });

  it('ERROR response', async () => {
    chai.request(url)
    .get('/not-found')
    .end((err, res) => {
      expect(res).to.have.status(404);
      assert.equal(res.body.message, 'SERVICE_NOT_FOUND');
    });
  });
});

// Services ON
describe('Indicators services', () => {
  it('POST /indicators/getLast response', () => {
    chai.request(url)
    .post('/indicators/getLast')
    .end((err, res) => {
      // console.log(res.body);
      expect(res).to.have.status(200);
    });
  });
});