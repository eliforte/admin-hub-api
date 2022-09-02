import { Router } from 'express';
import UserController from '../controllers/users';
import Validate from '../middlewares/validations/validate';
import ValidadeUser from '../middlewares/validations/user';
import Auth from '../utils/auth/token';

export default class UserRoutes {
  protected _router: Router;

  protected _path: string = '/users';

  protected _controller: UserController;

  private _validate: Validate;

  constructor(
    controller: UserController = new UserController(),
    validate: Validate = new ValidadeUser(),
  ) {
    this._controller = controller;
    this._validate = validate;
    this._routes();
  }

  public get router(): Router {
    return this._router;
  }

  protected _routes(): void {
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
}
