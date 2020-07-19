import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { UserSkillMySuffixDetailComponent } from 'app/entities/user-skill-my-suffix/user-skill-my-suffix-detail.component';
import { UserSkillMySuffix } from 'app/shared/model/user-skill-my-suffix.model';

describe('Component Tests', () => {
  describe('UserSkillMySuffix Management Detail Component', () => {
    let comp: UserSkillMySuffixDetailComponent;
    let fixture: ComponentFixture<UserSkillMySuffixDetailComponent>;
    const route = ({ data: of({ userSkill: new UserSkillMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [UserSkillMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UserSkillMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserSkillMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userSkill on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userSkill).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
