import PairController from './pair.controller';
import { IRoute, IRouteConfig, HttpMethods, AuthStrategies } from '../../interfaces/utils/Route';

class PairRoute implements IRoute {
  public basePath = '/pairs';
  public controller = new PairController();

  public getServerRoutes(): IRouteConfig[] {
    return [
      {
        method: HttpMethods.POST,
        auth: AuthStrategies.OAUTH,
        handler: this.controller.post,
      }
    ];
  }
}

export default PairRoute;
