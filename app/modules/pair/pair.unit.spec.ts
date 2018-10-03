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
    describe('POST /api/pairs/', () => {
      const pairObj = {
        'exchangeId': 'exchange_1',
        'key': '1',
        'secret': '1',
      };
      const incorrectPairObj = {
        'exchangeId': 'asdf',
        'key': '1',
        'secret': '1',
      }
      const pairReturn = {
        '_id': '5b964b2753927fddb77f1f0b',
        'exchangeId': 'exchange_1',
        'key': '1',
        'secret': '1',
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
          .post('/api/pairs')
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
          .post('/api/pairs')
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
          .post('/api/pairs')
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