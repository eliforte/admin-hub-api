import { ObjectSchema } from 'joi';
import Validate from './validate';
import { SCHEMAUser } from '../../utils/schemas';

export default class ValidadeUser extends Validate {
  constructor(schema: ObjectSchema = SCHEMAUser) {
    super(schema);
  }
}
