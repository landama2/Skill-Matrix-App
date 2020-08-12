import { ICCUserMySuffix } from 'app/shared/model/cc-user-my-suffix.model';
import { ICategoryMySuffix } from 'app/shared/model/category-my-suffix.model';
import { ISubCategoryMySuffix } from 'app/shared/model/sub-category-my-suffix.model';
import { ISkillLevelMySuffix } from 'app/shared/model/skill-level-my-suffix.model';
import { IUserSkillMySuffix } from 'app/shared/model/user-skill-my-suffix.model';
import { Directive, OnDestroy, OnInit } from '@angular/core';

export interface ISkill // extends OnInit, OnDestroy
{
  id?: number;
  name?: string;
  cCUsers?: ICCUserMySuffix[];
  category?: ICategoryMySuffix;
  subCategory?: ISubCategoryMySuffix;
  skillLevel?: ISkillLevelMySuffix;
  userSkills?: IUserSkillMySuffix[];

  // onInit(): void
}

// @Directive()
export class Skill implements ISkill
// , OnInit, OnDestroy
{
  constructor(
    public id?: number,
    public name?: string,
    public cCUsers?: ICCUserMySuffix[],
    public category?: ICategoryMySuffix,
    public subCategory?: ISubCategoryMySuffix,
    public skillLevel?: ISkillLevelMySuffix,
    public userSkills?: IUserSkillMySuffix[]
  ) {
    // this.onInit();
  }

  // onInit(): void {
  //   if (this.userSkills && this.userSkills.length > 0) {
  //     this.skillLevel = this.userSkills[0];
  //   }
  // }

  // ngOnInit(): void {
  //   if (this.userSkills && this.userSkills.length > 0) {
  //     this.skillLevel = this.userSkills[0];
  //   }
  // }

  // ngOnDestroy(): void {
  // if (this.eventSubscriber) {
  //   this.eventManager.destroy(this.eventSubscriber);
  // }
  // }

  // onInit(): void {
  // }
}
