import bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import UserModel from '../models/user';
import Auth from '../utils/auth/token';
import { ILogin } from '../utils/interfaces/ILogin';
import { IUser, IUserServiceCreate } from '../utils/interfaces/IUser';
import { USER_EXIST, USER_NOT_EXIST, INCORRECT_USER } from '../utils/errors';

export default class UserService {
  protected _model: UserModel;

  constructor(model: UserModel = new UserModel()) {
    this._model = model;
  }

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

  public login = async (email: string, password: string): Promise<ILogin> => {
    const user = await this._model.findByEmail(email);
    if (!user) throw USER_NOT_EXIST;

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) throw INCORRECT_USER;

    const token = Auth.createToken({ _id: user._id, email, name: user.name });

    return { token, name: user.name, _id: user._id };
  };

  public findAll = async (): Promise<IUser[]> => this._model.findAll();

  public findById = async (id: string): Promise<IUser | null> => this._model.findById(id);

  public update = async (id: string, data: IUser): Promise<IUser | null> => (
    this._model.update(id, data)
  );

  public delete = async (id: string): Promise<IUser | null> => this._model.delete(id);
}
