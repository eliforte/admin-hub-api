import { isValidObjectId } from 'mongoose';
import VoucherModel from '../models/voucher';
import { IVoucher, IQuerys } from '../utils/interfaces/IVoucher';
import { VOUCHER_NOT_EXIST } from '../utils/errors';
import { addLeadingZeros } from '../helpers/addLeadingZeros';
import { monthsWithQueryExist, formatMonth } from '../helpers/monthForNewdate';

export default class VoucherService {
  protected _model: VoucherModel;

  constructor(model: VoucherModel = new VoucherModel()) {
    this._model = model;
  }

  public create = async (voucher: IVoucher): Promise<IVoucher> => {
    const currentDate = new Date();
    const formatDateForNextPayment = `${
      currentDate.getFullYear()
    }-${
      addLeadingZeros(currentDate.getMonth() + 2, 2)
    }-${
      voucher.payment_day
    }`;

    const nextDate = voucher.form_of_payment === 'Parcelamento'
      ? formatDateForNextPayment
      : '';

    const setVoucherInfos = {
      ...voucher,
      updatedAt: null,
      quantity_installments: voucher.quantity_installments || 0,
      next_payment: nextDate,
    } as IVoucher;

    const newVoucher = await this._model.create(setVoucherInfos);
    return newVoucher;
  };

  public filterAll = async (infos: IQuerys): Promise<IVoucher[]> => {
    const {
      periodFormat,
      month,
      paymentMethod,
      formOfPayment,
      _id,
    } = infos;

    const monthForQuery = formatMonth(month);
    const currentYear = new Date().getFullYear();
    const regexForDateQuery = periodFormat === 'Ano'
      ? new RegExp(`${currentYear}`, 'i')
      : new RegExp(`${currentYear}-${monthForQuery}`);

    const query: any = {
      last_payment: { $regex: regexForDateQuery },
      responsible_id: _id,
    };

    if (paymentMethod !== '') {
      query.payment_method = paymentMethod;
    }

    if (formOfPayment !== '') {
      query.form_of_payment = formOfPayment;
    }
    console.log(query);

    const servicesFiltered = await this._model.filterAll(query);
    console.log(servicesFiltered);

    return servicesFiltered;
  };

  public findAllByResponsible = async (
    userId: string | undefined,
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
