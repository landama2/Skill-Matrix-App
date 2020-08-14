import { ISkillLevelMySuffix } from 'app/shared/model/skill-level-my-suffix.model';
import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { ISkillMySuffix } from 'app/shared/model/skill-my-suffix.model';

export interface ISkillSearch {
  id?: number;

  changedAt?: Moment;
  user?: IUser;
  skillLevel?: ISkillLevelMySuffix;
  skill?: ISkillMySuffix;
}

// @Directive()
export class SkillSearch implements ISkillSearch {
  constructor(public id?: number, public user?: IUser, public skillLevel?: ISkillLevelMySuffix, public skill?: ISkillMySuffix) {}
}
