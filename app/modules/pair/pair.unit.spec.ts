import * as chai from 'chai';
import * as supertest from 'supertest';
import * as sinon from 'sinon';
import { app } from '../../../server';
import Pair from '../../models/pair.model';

const expect = chai.expect;
describe('Unit Testing', () => {
  let sandbox: sinon.SinonSandbox = null;
  beforeEach((done) => {
    sandbox = sinon.createSandbox();
    done();
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('Pair API', () => {
    describe('POST /pairs/', () => {
      const pairObj = {
        'exchange': 'exchange_2',
        'key': '1',
        'secret': '1',
        'user_id': '1234'
      };
      const incorrectPairObj = {
        'exchange': 'asdf',
        'key': '1',
        'secret': '1',
        'user_id': '1234'
      };
      const pairReturn = {
        '_id': '5b964b2753927fddb77f1f0b',
        'exchange_id': 'exchange_2',
        'key': '1',
        'secret': '1',
        'user_id': '1234',
        'created_at': '2018-09-10T10:44:55.218Z',
        'updated_at': '2018-09-10T10:44:55.218Z',
        '__v': 0
      };

      it('should save pair successfully', (done) => {
        sandbox
          .mock(Pair)
          .expects('create')
          .resolves(pairReturn);
        supertest(app)
          .post('/pairs')
          .send(pairObj)
          .end((err: any, res: supertest.Response) => {
            if (err) {
              done(err);
            } else {
              expect(res.status).to.equal(200);
              done();
            }
          });
      });
      it('should throw 500 if server error while writing db', (done) => {
        sandbox
          .mock(Pair)
          .expects('create')
          .throws(null);
        supertest(app)
          .post('/pairs')
          .send(pairObj)
          .end((err: any, res: supertest.Response) => {
            if (err) {
              done(err);
            } else {
              expect(res.status).to.equal(500);
              done();
            }
          });
      });
      it('should throw 404 if exchange not found', (done) => {
        supertest(app)
          .post('/pairs')
          .send(incorrectPairObj)
          .end((err: any, res: supertest.Response) => {
            if (err) {
              done(err);
            } else {
              expect(res.status).to.equal(404);
              done();
            }
          });
      });
    });

    describe('GET /pairs/', () => {
      const pairObj = {
        'exchange': 'exchange_2',
        'key': '1',
        'secret': '1',
        'user_id': '1234'
      };
      const incorrectPairObj = {
        'exchange': 'asdf',
        'key': '1',
        'secret': '1',
        'user_id': '1234'
      };
      const pairReturn = {
        '_id': '5b964b2753927fddb77f1f0b',
        'exchange_id': 'exchange_2',
        'key': '1',
        'secret': '1',
        'user_id': '1234',
        'created_at': '2018-09-10T10:44:55.218Z',
        'updated_at': '2018-09-10T10:44:55.218Z',
        '__v': 0
      };

      it('should retrieve pair successfully', (done) => {
        sandbox
          .mock(Pair)
          .expects('findOne')
          .resolves(pairReturn);
        supertest(app)
          .get('/pairs?user_id=1234&exchange=exchange_2')
          .end((err: any, res: supertest.Response) => {
            if (err) {
              done(err);
            } else {
              expect(res.status).to.equal(200);
              done();
            }
          });
      });
      it('should throw 500 if server error while reading db', (done) => {
        sandbox
          .mock(Pair)
          .expects('findOne')
          .throws(null);
        supertest(app)
          .get('/pairs?user_id=1234&exchange=exchange_2')
          .end((err: any, res: supertest.Response) => {
            if (err) {
              done(err);
            } else {
              expect(res.status).to.equal(500);
              done();
            }
          });
      });
      it('should throw 404 if exchange not found', (done) => {
        supertest(app)
          .get('/pairs?user_id=1234&exchange=exchange_123')
          .send(incorrectPairObj)
          .end((err: any, res: supertest.Response) => {
            if (err) {
              done(err);
            } else {
              expect(res.status).to.equal(404);
              done();
            }
          });
      });
    });
  });
});