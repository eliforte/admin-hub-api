import bcrypt from 'bcrypt';
import Model from '../models';
import UserModel from '../models/user';
import { Service } from '.';
import Auth from '../utils/auth/token';
import { IUser, IUserServiceCreate } from '../utils/interfaces/IUser';
import { USER_EXIST } from '../utils/errors';

export default class UserService extends Service<IUser> {
  constructor(model: Model<IUser> = new UserModel()) {
    super(model);
  }

  public findAllByResponsible = async (userId: string): Promise<IUser[]> => (
    this._model.findAllByResponsible(userId)
  );

  public create = async (user: IUser): Promise<IUserServiceCreate> => {
    const { name, email, password } = user;

    const userExist = await this._model.findByEmail(email);
    if (userExist) throw USER_EXIST;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = await this._model.create({ name, email, password: hash });
    const token = Auth.createToken({ _id: newUser._id, name, email });

    return {
      _id: newUser._id,
      name,
      token,
    };
  };

  public findAll = async (): Promise<IUser[]> => this._model.findAll();

  public findById = async (id: string): Promise<IUser | null> => this._model.findById(id);

  public update = async (id: string, data: IUser): Promise<IUser | null> => (
    this._model.update(id, data)
  );

  public delete = async (id: string): Promise<IUser | null> => this._model.delete(id);
}
