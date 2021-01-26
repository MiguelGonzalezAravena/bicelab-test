const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const url = 'http://127.0.0.1:5000';
const urlCore = process.env.npm_package_config_URL_BACK;

chai.use(chaiHttp);

// External back-end online
describe('External back-end is online?', () => {
  it('Request to core server', async () => {
    await chai.request(urlCore)
    .get('/')
    .then(res => {
      // Check structure
      expect(res).to.have.status(200);
      assert.property(res.body, 'apis', 'Field not found');
    })
    .catch(err => {
      throw err;
    });
  });
});

// Init server
describe('Configuration server', () => {
  it('OK response', async () => {
    await chai.request(url)
    .get('/')
    .then(res => {
      // Check structure
      expect(res).to.have.status(200);
    })
    .catch(err => {
      throw err;
    });
  });

  it('ERROR response', async () => {
    await chai.request(url)
    .get('/not-found')
    .then(res => {
      // Check structure
      expect(res).to.have.status(404);
      assert.property(res.body, 'message', 'message not found');
      assert.equal(res.body.message, 'SERVICE_NOT_FOUND', 'response not expected');
    })
    .catch(err => {
      throw err;
    });
  });
});

// Services ON
describe('Indicators services', () => {
  // indicators/getLast tests
  it('POST /indicators/getLast response', async () => {
    await chai.request(url)
    .post('/indicators/getLast')
    .then(res => {
      // Check structure
      expect(res).to.have.status(200);
      assert.include(res.body, { status: 'OK' }, 'status OK not found');
      assert.property(res.body, 'data', 'data not found');
      // Check keys from response
      Object.entries(res.body.data).forEach(([ key, value ]) => {
        assert.hasAllKeys(res.body.data[key], ['key', 'name', 'unit', 'date', 'value']);
      });
    })
    .catch(err => {
      throw err;
    });
  });

  // indicators/getValues tests
  it('POST /indicators/getValues response', async () => {
    await chai.request(url)
    .post('/indicators/getValues')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({ arg: JSON.stringify({ key: 'dolar' }) })
    .then(res => {
      // Check structure
      expect(res).to.have.status(200);
      assert.include(res.body, { status: 'OK' }, 'status OK not found');
      assert.property(res.body, 'data', 'data not found');
      // Check keys from response
      assert.hasAllKeys(res.body.data, ['key', 'name', 'unit', 'values']);
    })
    .catch(err => {
      throw err;
    });
  });

  // indicators/getValuesByDate test
  it('POST /indicators/getValuesByDate response', async () => {
    await chai.request(url)
    .post('/indicators/getValuesByDate')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({ arg: JSON.stringify({ key: 'dolar', date: '15-01-2020' }) })
    .then(res => {
      // Check structure
      expect(res).to.have.status(200);
      assert.include(res.body, { status: 'OK' }, 'status OK not found');
      assert.property(res.body, 'data', 'data not found');
      // Check keys from response
      assert.hasAllKeys(res.body.data, ['key', 'name', 'unit', 'date', 'value']);
    })
    .catch(err => {
      throw err;
    });
  });
});