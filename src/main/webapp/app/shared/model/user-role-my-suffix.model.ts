import { ICCUserMySuffix } from 'app/shared/model/cc-user-my-suffix.model';

export interface IUserRoleMySuffix {
  id?: number;
  name?: string;
  cCUsers?: ICCUserMySuffix[];
}

export class UserRoleMySuffix implements IUserRoleMySuffix {
  constructor(public id?: number, public name?: string, public cCUsers?: ICCUserMySuffix[]) {}
}
