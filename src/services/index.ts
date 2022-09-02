import Model from '../models';
import { IUserServiceCreate } from '../utils/interfaces/IUser';

export abstract class Service<T> {
  protected _model: Model<T>;

  constructor(table: Model<T>) {
    this._model = table;
  }

  public abstract create(infos: T): Promise<T | IUserServiceCreate>;

  public abstract findAll(): Promise<T[]>;

  public abstract findAllByResponsible(id: string | undefined): Promise<T[]>

  public abstract findById(id: string): Promise<T | null>;

  public abstract update(id: string, infos: T): Promise<T | null>;

  public abstract delete(id: string): Promise<T | null>;
}
