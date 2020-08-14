import { ICCUserMySuffix } from 'app/shared/model/cc-user-my-suffix.model';
import { ICategoryMySuffix } from 'app/shared/model/category-my-suffix.model';
import { ISubCategoryMySuffix } from 'app/shared/model/sub-category-my-suffix.model';
import { ISkillLevelMySuffix } from 'app/shared/model/skill-level-my-suffix.model';
import { IUserSkillMySuffix } from 'app/shared/model/user-skill-my-suffix.model';

export interface ISkill {
  id?: number;
  name?: string;
  cCUsers?: ICCUserMySuffix[];
  category?: ICategoryMySuffix;
  subCategory?: ISubCategoryMySuffix;
  skillLevel?: ISkillLevelMySuffix;
  userSkills?: IUserSkillMySuffix[];
}

export class Skill implements ISkill {
  constructor(
    public id?: number,
    public name?: string,
    public cCUsers?: ICCUserMySuffix[],
    public category?: ICategoryMySuffix,
    public subCategory?: ISubCategoryMySuffix,
    public skillLevel?: ISkillLevelMySuffix,
    public userSkills?: IUserSkillMySuffix[]
  ) {}
}
