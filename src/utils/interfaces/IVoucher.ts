export interface IVoucher {
  _id?: string;
  type: string;
  pacient_fullname: string;
  plan: string;
  payment_method: string;
  form_of_payment: string;
  quantity_installments: number;
  total: number;
  quantity_installments_paid: number;
  payment_day: number | null;
  last_payment: string;
  next_payment: string | null;
  installment_value: number | null;
  responsible_id?: string;
  updated_at: Date,
  created_at: Date,
}
