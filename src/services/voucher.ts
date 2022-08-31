import { isValidObjectId } from 'mongoose';
import Model from '../models';
import VoucherModel from '../models/voucher';
import { Service } from '.';
import { IVoucher } from '../utils/interfaces/IVoucher';
import { VOUCHER_NOT_EXIST } from '../utils/errors';

export default class VoucherService extends Service<IVoucher> {
  constructor(model: Model<IVoucher> = new VoucherModel()) {
    super(model);
  }

  public create = async (voucher: IVoucher): Promise<IVoucher> => {
    const currentDate = new Date();
    const nextDate = `${
      currentDate.getFullYear()
    }-${
      currentDate.getMonth() + 1
    }-${
      voucher.payment_day
    }`

    const setVoucherInfos = {
      ...voucher,
      updatedAt: null,
      quantity_installments: voucher.quantity_installments || 0,
      next_payment: nextDate || null,
    } as IVoucher;

    const newVoucher = await this._model.create(setVoucherInfos);
    return newVoucher;
  };

  public findAll = async (): Promise<IVoucher[]> => this._model.findAll();

  public findAllByResponsible = async (
    userId: string,
  ): Promise<IVoucher[]> => this._model.findAllByResponsible(userId);

  public findById = async (id: string): Promise<IVoucher | null> => {
    const findVoucher = await this._model.findById(id);
    if (!findVoucher) throw VOUCHER_NOT_EXIST;
    return findVoucher;
  };

  public update = async (id: string, voucher: IVoucher): Promise<IVoucher | null> => {
    if (!isValidObjectId(id)) throw VOUCHER_NOT_EXIST;
    voucher.updated_at = new Date();
    const updatedVoucher = await this._model.update(id, voucher);
    return updatedVoucher;
  };

  public delete = async (id: string): Promise<IVoucher | null> => {
    if (!isValidObjectId(id)) throw VOUCHER_NOT_EXIST;
    const deletedVoucher = await this._model.delete(id);
    return deletedVoucher;
  };
}
