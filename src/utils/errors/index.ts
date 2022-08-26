import NewError from './newError';

export const TOKEN_INVALID = new NewError(401, 'Token inválido');

export const MISSING_TOKEN = new NewError(401, 'Usuário não autorizado');

export const USER_NOT_EXIST = new NewError(404, 'Usuário não existe');

export const USER_EXIST = new NewError(409, 'Email já registrado');

export const INCORRECT_USER = new NewError(401, 'Senha ou email incorretos');

export const VOUCHER_NOT_EXIST = new NewError(404, 'Paciênte não encontrado');
