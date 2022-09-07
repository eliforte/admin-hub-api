import { isValidObjectId } from 'mongoose';
import dayjs from 'dayjs';
import VoucherModel from '../models/voucher';
import { IVoucher, IQuerys, IEditVoucher } from '../utils/interfaces/IVoucher';
import { VOUCHER_NOT_EXIST } from '../utils/errors';
import { addLeadingZeros } from '../helpers/addLeadingZeros';
import { monthsWithQueryExist, formatMonth } from '../helpers/monthForNewdate';

export default class VoucherService {
  protected _model: VoucherModel;

  constructor(model: VoucherModel = new VoucherModel()) {
    this._model = model;
  }

  public create = async (voucher: IVoucher): Promise<IVoucher> => {
    const currentDate = dayjs(voucher.last_payment).format('DD-MM-YYYY');
    const formatDateForNextPayment = dayjs(voucher.last_payment).add(1, 'month').format('DD-MM-YYYY');

    const setVoucherInfos = {
      ...voucher,
      last_payment: currentDate,
      updatedAt: null,
      quantity_installments: voucher.quantity_installments || 0,
      next_payment: formatDateForNextPayment,
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
      : new RegExp(`${monthForQuery}-${currentYear}`);

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

    const servicesFiltered = await this._model.filterAll(query);

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

  public update = async (id: string, voucher: IEditVoucher): Promise<IVoucher | null> => {
    const { last_payment, quantity_installments_paid } = voucher;
    if (!isValidObjectId(id)) throw VOUCHER_NOT_EXIST;
    const lastPayment = dayjs(last_payment).format('DD-MM-YYYY');
    const nextPayment = dayjs(last_payment).add(quantity_installments_paid, 'months').format('DD-MM-YYYY');

    const infosForUpdate = {
      last_payment: lastPayment,
      next_payment: nextPayment,
      quantity_installments_paid,
    };

    const updatedVoucher = await this._model.update(id, infosForUpdate);
    return updatedVoucher;
  };

  public delete = async (id: string): Promise<IVoucher | null> => {
    if (!isValidObjectId(id)) throw VOUCHER_NOT_EXIST;
    const deletedVoucher = await this._model.delete(id);
    return deletedVoucher;
  };
}
