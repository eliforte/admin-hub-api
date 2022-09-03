import mongoose, { Model } from 'mongoose';
import { IVoucher, IQuerys } from '../utils/interfaces/IVoucher';

const VoucherSchema = new mongoose.Schema<IVoucher>({
  type: { type: String, required: true },
  pacient_fullname: { type: String, required: true },
  plan: { type: String, required: true },
  payment_method: { type: String, required: true },
  form_of_payment: { type: String, required: true },
  quantity_installments: { type: Number },
  total: { type: Number, required: true },
  quantity_installments_paid: { type: Number, required: true },
  payment_day: { type: Number, required: true },
  last_payment: { type: String, required: true },
  next_payment: { type: String },
  installment_value: { type: Number, required: true },
  responsible_id: { type: String, required: true },
  updated_at: { type: Date, require: true },
  created_at: { type: Date, require: true },
}, { versionKey: false });

export default class VoucherModel {
  protected document: Model<IVoucher>;

  constructor(schema: Model<IVoucher> = mongoose.model('Vouchers', VoucherSchema)) {
    this.document = schema;
  }

  public async findAllByResponsible(id: string | undefined): Promise<IVoucher[]> {
    return this.document.find({ responsible_id: id });
  }

  public async create(infos: IVoucher): Promise<IVoucher> {
    return this.document.create(infos);
  }

  public async filterAll(query: IQuerys): Promise<IVoucher[]> {
    console.log(query);

    return this.document.find(query);
  }

  public async findById(id: string): Promise<IVoucher | null> {
    return this.document.findById(id);
  }

  public async update(id: string, infos: IVoucher): Promise<IVoucher | null> {
    return this.document.findByIdAndUpdate(id, infos, { new: true });
  }

  public async delete(id: string): Promise<IVoucher | null> {
    return this.document.findByIdAndDelete(id);
  }
}
