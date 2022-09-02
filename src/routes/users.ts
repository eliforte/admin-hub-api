import { Router } from 'express';
import UserController from '../controllers/users';
import Validate from '../middlewares/validations/validate';
import ValidadeUser from '../middlewares/validations/user';
import Auth from '../utils/auth/token';

export default class UserRoutes {
  private _router: Router;

  private _path: string = '/users';

  private _controller: UserController;

  private _validate: Validate;

  constructor(
    controller: UserController = new UserController(),
    validate: Validate = new ValidadeUser(),
  ) {
    this._router = Router();
    this._controller = controller;
    this._validate = validate;
    this._routes();
  }

  private _routes(): void {
    this._router.get(
      `${this._path}/:id`,
      Auth.verifyToken,
      this._controller.findOne,
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

  public get router(): Router {
    return this._router;
  }
}
