import { ObjectSchema } from 'joi';
import Validate from './validate';
import { SCHEMALogin } from '../../utils/schemas';

export default class ValidadeLogin extends Validate {
  constructor(schema: ObjectSchema = SCHEMALogin) {
    super(schema);
  }
}
