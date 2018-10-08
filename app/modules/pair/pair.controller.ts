import { InternalServerError } from 'restify-errors';
import { IPair } from '../../../app/interfaces/models';
import IController from '../../interfaces/utils/IController';
import { IRequest, IResponse } from '../../interfaces/utils/IServer';
import { hash } from 'bcrypt';
import Pair from '../../models/pair.model';
import * as restify from 'restify';
const exchangeIds = require('../../../config/exchanges.json');

export default class PairController implements IController {
  public async post(req: IRequest, res: IResponse, next: restify.Next) {
    try {
      if (!exchangeIds[req.body.exchange]) {
        return res.send(new restify.NotFoundError('Exchange not found for given id'));
      } else {
        const pair = {
          key: req.body.key,
          secret: await hash(req.body.secret, 12),
          exchange_id: exchangeIds[req.body.exchange],
          user_id: req.body.user_id
        };
        const saved = <IPair> await Pair.create(pair);
        return res.send(saved);
      }
    } catch (e) {
      req.log.error(e);
      return res.send(new InternalServerError());
    }
  }

  public async get(req: IRequest, res: IResponse, next: restify.Next) {
    try {
      if (!exchangeIds[req.query.exchange]) {
        return res.send(new restify.NotFoundError('Exchange not found for given id'));
      } else {
        const pair = <IPair> await Pair.findOne({
          user_id: req.query.user_id,
          exchange_id: exchangeIds[req.query.exchange]
        })
        return res.send(pair);
      }
    } catch (e) {
      req.log.error(e);
      return res.send(new InternalServerError());
    }
  }
}
