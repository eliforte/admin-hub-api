import { isValidObjectId } from 'mongoose';
import dayjs from 'dayjs';
import VoucherModel from '../models/voucher';
import { IVoucher, IQuerys, IEditVoucher } from '../utils/interfaces/IVoucher';
import { VOUCHER_NOT_EXIST } from '../utils/errors';
import { formatMonth } from '../helpers/monthForNewdate';

export default class VoucherService {
  protected _model: VoucherModel;

  constructor(model: VoucherModel = new VoucherModel()) {
    this._model = model;
  }

  public create = async (voucher: IVoucher): Promise<IVoucher> => {
    const currentDate = dayjs(voucher.last_payment).format();
    const lastPayment = dayjs(voucher.last_payment).format('DD-MM-YYYY');

    const nextDatePayment = dayjs(currentDate)
      .add(Number(voucher.payment_day) - 1, 'days')
      .add(1, 'month')
      .format('DD-MM-YYYY');

    const setVoucherInfos = {
      ...voucher,
      last_payment: lastPayment,
      updatedAt: null,
      quantity_installments: voucher.quantity_installments || 0,
      next_payment: nextDatePayment,
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
    if (!isValidObjectId(id)) throw VOUCHER_NOT_EXIST;
    const olderVoucher = await this._model.findById(id);
    const lastPayment = dayjs(voucher.last_payment).format('DD-MM-YYYY');

    const newQuantityInstallments = olderVoucher
      && olderVoucher.quantity_installments_paid + voucher.quantity_installments_paid;

    const formatNextPayment = olderVoucher && dayjs(olderVoucher.next_payment)
      .add(voucher.quantity_installments_paid, 'months')
      .format('DD-MM-YYYY');

    const quantityInstallmentsPaid = olderVoucher
    && voucher.quantity_installments_paid + olderVoucher.quantity_installments_paid;

    const nextPayment = quantityInstallmentsPaid === olderVoucher?.quantity_installments
      ? null
      : formatNextPayment;

    const infosForUpdate = {
      last_payment: lastPayment,
      next_payment: nextPayment,
      quantity_installments_paid: newQuantityInstallments,
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
