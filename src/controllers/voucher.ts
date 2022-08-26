import { Request as Req, Response as Res, NextFunction } from 'express';
import Controller from '.';
import { Service } from '../services';
import VoucherService from '../services/voucher';
import { IVoucher } from '../utils/interfaces/IVoucher';

export default class ServiceController extends Controller<IVoucher> {
  constructor(service: Service<IVoucher> = new VoucherService()) {
    super(service);
  }

  public create = async (req: Req, res: Res, next: NextFunction): Promise<typeof res | void> => {
    try {
      const { _id } = req.user;
      const result = await this._service.create({ ...req.body, responsible_id: _id } as IVoucher);
      res.status(201).json({ ...result, message: 'successfully created' });
    } catch (error) {
      next(error);
    }
  };
}
