import { ISkillMySuffix } from 'app/shared/model/skill-my-suffix.model';

export interface ISubCategoryMySuffix {
  id?: number;
  name?: string;
  skills?: ISkillMySuffix[];
  categoryId?: number;
}

export class SubCategoryMySuffix implements ISubCategoryMySuffix {
  constructor(public id?: number, public name?: string, public skills?: ISkillMySuffix[], public categoryId?: number) {}
}
