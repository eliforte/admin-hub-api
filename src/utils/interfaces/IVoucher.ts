/* eslint-disable import/no-extraneous-dependencies */
import { ParsedQs } from 'qs';

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

export interface IQuerys extends ParsedQs {
  _id?: string;
  periodFormat: string,
  month: string;
  paymentMethod: string;
  formOfPayment: string;
}

export interface IEditVoucher {
  quantity_installments_paid: number;
  last_payment: string;
}
