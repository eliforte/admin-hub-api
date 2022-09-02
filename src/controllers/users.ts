import { Request as Req, Response as Res, NextFunction } from 'express';
import UserService from '../services/user';

export default class UserController {
  protected _service: UserService;

  constructor(service: UserService = new UserService()) {
    this._service = service;
  }

  public findOne = async (req: Req, res: Res, next: NextFunction): Promise<typeof res | void> => {
    try {
      const result = await this._service.findById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Req, res: Res, next: NextFunction): Promise<typeof res | void> => {
    try {
      const result = await this._service.create(req.body);
      res.status(201).json({ ...result, message: 'successfully created' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Req, res: Res, next: NextFunction): Promise<typeof res | void> => {
    try {
      const result = await this._service.update(req.params.id, req.body);
      res.status(200).json({ result, message: 'successfully updated' });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Req, res: Res, next: NextFunction): Promise<typeof res | void> => {
    try {
      await this._service.delete(req.params.id);
      res.status(204).json({ message: 'successfully deleted' });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Req, res: Res, next: NextFunction): Promise<typeof res | void> => {
    try {
      const { email, password } = req.body;
      const result = await this._service.login(email, password);
      res.status(200).json({ ...result });
    } catch (error) {
      next(error);
    }
  };
}
