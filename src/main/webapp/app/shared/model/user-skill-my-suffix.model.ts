import { Moment } from 'moment';

export interface IUserSkillMySuffix {
  id?: number;
  changedAt?: Moment;
  userId?: number;
  skillLevelId?: number;
  skillId?: number;
}

export class UserSkillMySuffix implements IUserSkillMySuffix {
  constructor(
    public id?: number,
    public changedAt?: Moment,
    public userId?: number,
    public skillLevelId?: number,
    public skillId?: number
  ) {}
}
