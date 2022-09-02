import { Router } from 'express';
import VoucherController from '../controllers/voucher';
import Validate from '../middlewares/validations/validate';
import ValidadeVoucher from '../middlewares/validations/voucher';
import Auth from '../utils/auth/token';

export default class VoucherRoutes {
  protected _router: Router;

  protected _path: string = '/voucher';

  protected _controller: VoucherController;

  private _validate: Validate;

  constructor(
    controller: VoucherController = new VoucherController(),
    validate: Validate = new ValidadeVoucher(),
  ) {
    this._controller = controller;
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
      Auth.verifyToken,
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
