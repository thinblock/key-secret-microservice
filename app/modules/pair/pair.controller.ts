import { InternalServerError } from 'restify-errors';
import { IPair } from '../../../app/interfaces/models';
import { IExchange } from '../../../app/interfaces/models';
import IController from '../../interfaces/utils/IController';
import { IRequest, IResponse } from '../../interfaces/utils/IServer';
import { hash } from 'bcrypt';
import Pair from '../../models/pair.model';
import Exchange from '../../models/exchange.model';
import * as restify from 'restify';

export default class PairController implements IController {
  public async post(req: IRequest, res: IResponse, next: restify.Next) {
    try {
      const exchange = <IExchange> await Exchange.findOne({ exchangeId: req.body.exchangeId });

      if (!exchange) {
        return res.send(new restify.NotFoundError('Exchange not found for given id'));
      } else {
        const pair = {
          key: req.body.key,
          secret: await hash(req.body.secret, 12),
          exchangeId: exchange.exchangeId
        };
        const saved = <IPair> await Pair.create(pair);
        return res.send(saved);
      }
    } catch (e) {
      console.log(e);
      req.log.error(e);
      return res.send(new InternalServerError());
    }
  }
}
