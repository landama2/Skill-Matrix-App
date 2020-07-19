import { ISubCategoryMySuffix } from 'app/shared/model/sub-category-my-suffix.model';
import { ISkillMySuffix } from 'app/shared/model/skill-my-suffix.model';

export interface ICategoryMySuffix {
  id?: number;
  name?: string;
  subCategories?: ISubCategoryMySuffix[];
  skills?: ISkillMySuffix[];
}

export class CategoryMySuffix implements ICategoryMySuffix {
  constructor(public id?: number, public name?: string, public subCategories?: ISubCategoryMySuffix[], public skills?: ISkillMySuffix[]) {}
}
