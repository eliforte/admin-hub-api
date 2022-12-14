import { ObjectSchema } from 'joi';
import Validate from './validate';
import { SCHEMAVoucher } from '../../utils/schemas';

export default class ValidateVoucher extends Validate {
  constructor(schema: ObjectSchema = SCHEMAVoucher) {
    super(schema);
  }
}
