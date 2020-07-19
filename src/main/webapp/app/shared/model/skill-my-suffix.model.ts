import { ICCUserMySuffix } from 'app/shared/model/cc-user-my-suffix.model';

export interface ISkillMySuffix {
  id?: number;
  name?: string;
  cCUsers?: ICCUserMySuffix[];
  categoryId?: number;
  subCategoryId?: number;
}

export class SkillMySuffix implements ISkillMySuffix {
  constructor(
    public id?: number,
    public name?: string,
    public cCUsers?: ICCUserMySuffix[],
    public categoryId?: number,
    public subCategoryId?: number
  ) {}
}
