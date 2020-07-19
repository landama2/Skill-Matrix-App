import { Moment } from 'moment';
import { IUserSkillMySuffix } from 'app/shared/model/user-skill-my-suffix.model';

export interface ICCUserMySuffix {
  id?: number;
  fullName?: string;
  createdAt?: Moment;
  userSkills?: IUserSkillMySuffix[];
  userRoleId?: number;
  skillId?: number;
}

export class CCUserMySuffix implements ICCUserMySuffix {
  constructor(
    public id?: number,
    public fullName?: string,
    public createdAt?: Moment,
    public userSkills?: IUserSkillMySuffix[],
    public userRoleId?: number,
    public skillId?: number
  ) {}
}
