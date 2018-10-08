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
      },
      {
        method: HttpMethods.GET,
        auth: AuthStrategies.PUBLIC,
        handler: this.controller.get,
      }
    ];
  }
}

export default PairRoute;
