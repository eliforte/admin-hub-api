import RouteGenerator from './routeGenerator';
import Controller from '../controllers';
import UserController from '../controllers/users';
import Validate from '../middlewares/validations/validate';
import ValidadeUser from '../middlewares/validations/user';
import Auth from '../utils/auth/token';
import { IUser } from '../utils/interfaces/IUser';

export default class UserRoutes extends RouteGenerator<IUser> {
  protected _path: string = '/users';

  private _validate: Validate;

  constructor(
    controller: Controller<IUser> = new UserController(),
    validate: Validate = new ValidadeUser(),
  ) {
    super(controller);
    this._validate = validate;
    this._routes();
  }

  protected _routes(): void {
    this._router.get(
      `${this._path}/:id`,
      Auth.verifyToken,
      this._controller.findOne,
    );
    this._router.get(
      this._path,
      Auth.verifyToken,
      this._controller.findAll,
    );
    this._router.post(
      this._path,
      this._validate.validateReqBody,
      this._controller.create,
    );
    this._router.put(
      `${this._path}/:id`,
      Auth.verifyToken,
      this._validate.validateReqBody,
      this._controller.update,
    );
    this._router.delete(
      `${this._path}/:id`,
      Auth.verifyToken,
      this._controller.delete,
    );
  }
}
