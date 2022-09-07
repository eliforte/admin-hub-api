import { Router } from 'express';
import VoucherController from '../controllers/voucher';
import Validate from '../middlewares/validations/validate';
import ValidadeVoucher from '../middlewares/validations/voucher';
import ValidateEditVoucher from '../middlewares/validations/updateVoucher';
import Auth from '../utils/auth/token';

export default class VoucherRoutes {
  private _router: Router;

  private _path: string = '/voucher';

  private _controller: VoucherController;

  private _validate: Validate;

  private _validateUpdate: Validate;

  constructor(
    controller: VoucherController = new VoucherController(),
    validate: Validate = new ValidadeVoucher(),
    updateVoucher: Validate = new ValidateEditVoucher(),
  ) {
    this._router = Router();
    this._controller = controller;
    this._validate = validate;
    this._validateUpdate = updateVoucher;
    this._routes();
  }

  private _routes(): void {
    this._router.get(
      `${this._path}/filter`,
      Auth.verifyToken,
      this._controller.filterAll,
    );
    this._router.get(
      this._path,
      Auth.verifyToken,
      this._controller.findByResponsible,
    );
    this._router.post(
      this._path,
      Auth.verifyToken,
      this._validate.validateReqBody,
      this._controller.create,
    );
    this._router.get(
      `${this._path}/:id`,
      Auth.verifyToken,
      this._controller.findOne,
    );
    this._router.put(
      `${this._path}/:id`,
      Auth.verifyToken,
      this._validateUpdate.validateReqBody,
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
