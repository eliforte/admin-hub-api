import mongoose, { Model } from 'mongoose';
import { IUser } from '../utils/interfaces/IUser';

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
}, { versionKey: false });

export default class UserModel {
  protected document: Model<IUser>;

  constructor(schema: Model<IUser> = mongoose.model('Users', UserSchema)) {
    this.document = schema;
  }

  public async create(infos: IUser): Promise<IUser> {
    return this.document.create(infos);
  }

  public async findAll(): Promise<IUser[]> {
    return this.document.find();
  }

  public async findById(id: string): Promise<IUser | null> {
    return this.document.findById(id);
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return this.document.findOne({ email });
  }

  public async update(id: string, infos: IUser): Promise<IUser | null> {
    return this.document.findByIdAndUpdate(id, infos, { new: true });
  }

  public async delete(id: string): Promise<IUser | null> {
    return this.document.findByIdAndDelete(id);
  }
}
