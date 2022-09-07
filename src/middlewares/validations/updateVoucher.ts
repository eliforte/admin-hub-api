import { ObjectSchema } from 'joi';
import Validate from './validate';
import { SCHEMAEditVoucher } from '../../utils/schemas';

export default class ValidateEditVoucher extends Validate {
  constructor(schema: ObjectSchema = SCHEMAEditVoucher) {
    super(schema);
  }
}
