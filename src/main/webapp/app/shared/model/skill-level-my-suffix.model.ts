import { IUserSkillMySuffix } from 'app/shared/model/user-skill-my-suffix.model';

export interface ISkillLevelMySuffix {
  id?: number;
  name?: string;
  userSkills?: IUserSkillMySuffix[];
}

export class SkillLevelMySuffix implements ISkillLevelMySuffix {
  constructor(public id?: number, public name?: string, public userSkills?: IUserSkillMySuffix[]) {}
}
