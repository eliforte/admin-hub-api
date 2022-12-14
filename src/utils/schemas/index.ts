import Joi from 'joi';

export const SCHEMALogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const SCHEMAUser = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
});

export const SCHEMAVoucher = Joi.object({
  type: Joi.string().required(),
  pacient_fullname: Joi.string().required(),
  plan: Joi.string().required(),
  payment_method: Joi.string().required(),
  form_of_payment: Joi.string().required(),
  quantity_installments: Joi.number(),
  total: Joi.number().required(),
  quantity_installments_paid: Joi.number().required(),
  payment_day: Joi.number().allow(null).required(),
  last_payment: Joi.string().required(),
  next_payment: Joi.string().allow(null),
  installment_value: Joi.number().allow(null).required(),
});

export const SCHEMAEditVoucher = Joi.object({
  last_payment: Joi.string().required(),
  quantity_installments_paid: Joi.number(),
});
