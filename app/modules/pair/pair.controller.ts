import { InternalServerError } from 'restify-errors';
import { IPair } from '../../../app/interfaces/models';
import { IExchange } from '../../../app/interfaces/models';
import IController from '../../interfaces/utils/IController';
import { IRequest, IResponse } from '../../interfaces/utils/IServer';
import { hash } from 'bcrypt';
import Pair from '../../models/pair.model';
import * as restify from 'restify';
const exchangeIds = require('../../../config/exchanges.json');

export default class PairController implements IController {
  public async post(req: IRequest, res: IResponse, next: restify.Next) {
    try {
      if (!exchangeIds[req.body.exchangeId]) {
        return res.send(new restify.NotFoundError('Exchange not found for given id'));
      } else {
        const pair = {
          key: req.body.key,
          secret: await hash(req.body.secret, 12),
          exchangeId: exchangeIds[req.body.exchangeId]
        };
        const saved = <IPair> await Pair.create(pair);
        return res.send(saved);
      }
    } catch (e) {
      req.log.error(e);
      return res.send(new InternalServerError());
    }
  }
}
