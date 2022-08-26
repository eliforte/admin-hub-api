import { Router } from 'express';
import LoginController from '../controllers/loginController';
import Validate from '../middlewares/validations/validate';
import ValidadeLogin from '../middlewares/validations/login';

export default class LoginRoutes {
  private _router: Router;

  private _controller: LoginController;

  private _validate: Validate;

  constructor(
    controller: LoginController = new LoginController(),
    validate: Validate = new ValidadeLogin(),
  ) {
    this._router = Router();
    this._validate = validate;
    this._controller = controller;
    this._routes();
  }

  private _routes(): void {
    this._router.post('/login', this._validate.validateReqBody, this._controller.login);
  }

  public get router(): Router {
    return this._router;
  }
}