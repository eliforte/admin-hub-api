import mongoose from 'mongoose';
import Model from '.';
import { IVoucher } from '../utils/interfaces/IVoucher';

const VoucherSchema = new mongoose.Schema<IVoucher>({
  type: { type: String, required: true },
  pacient_fullname: { type: String, required: true },
  plan: { type: String, required: true },
  payment_method: { type: String, required: true },
  form_of_payment: { type: String, required: true },
  quantity_installments: { type: Number, required: true },
  total: { type: Number, required: true },
  quantity_installments_paid: { type: Number, required: true },
  payment_day: { type: Number, required: true },
  last_payment: { type: Date, required: true },
  next_payment: { type: Date, required: true },
  installment_value: { type: Number, required: true },
  responsible_id: { type: String, required: true },
  updated_at: { type: Date, require: true },
  created_at: { type: Date, require: true },
}, { versionKey: false });

export default class VoucherModel extends Model<IVoucher> {
  constructor() {
    super(mongoose.model('Voucher', VoucherSchema));
  }
}