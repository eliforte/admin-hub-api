import { Request as Req, Response as Res, NextFunction } from 'express';
import VoucherService from '../services/voucher';
import { IVoucher, IQuerys } from '../utils/interfaces/IVoucher';

export default class ServiceController {
  protected _service: VoucherService;

  constructor(service: VoucherService = new VoucherService()) {
    this._service = service;
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

  public findByResponsible = async (req: Req, res: Res, next: NextFunction): Promise<
    typeof res | void
  > => {
    try {
      const { _id } = req.user;
      const result = await this._service.findAllByResponsible(_id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public filterAll = async (req: Req<{}, {}, {}, IQuerys>, res: Res, next: NextFunction): Promise<
    typeof res | void
  > => {
    try {
      const {
        periodFormat,
        month,
        paymentMethod,
        formOfPayment,
      } = req.query;
      const { _id } = req.user;
      const result = await this._service.filterAll({
        periodFormat,
        month,
        paymentMethod,
        formOfPayment,
        _id,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public findOne = async (req: Req, res: Res, next: NextFunction): Promise<typeof res | void> => {
    try {
      const result = await this._service.findById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Req, res: Res, next: NextFunction): Promise<typeof res | void> => {
    try {
      const result = await this._service.update(req.params.id, req.body);
      res.status(200).json({ result, message: 'successfully updated' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Req, res: Res, next: NextFunction): Promise<typeof res | void> => {
    try {
      await this._service.delete(req.params.id);
      res.status(204).json({ message: 'successfully deleted' });
    } catch (error) {
      next(error);
    }
  };
}
