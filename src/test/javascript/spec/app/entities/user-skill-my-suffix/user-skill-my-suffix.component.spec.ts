import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlogTestModule } from '../../../test.module';
import { UserSkillMySuffixComponent } from 'app/entities/user-skill-my-suffix/user-skill-my-suffix.component';
import { UserSkillMySuffixService } from 'app/entities/user-skill-my-suffix/user-skill-my-suffix.service';
import { UserSkillMySuffix } from 'app/shared/model/user-skill-my-suffix.model';

describe('Component Tests', () => {
  describe('UserSkillMySuffix Management Component', () => {
    let comp: UserSkillMySuffixComponent;
    let fixture: ComponentFixture<UserSkillMySuffixComponent>;
    let service: UserSkillMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [UserSkillMySuffixComponent]
      })
        .overrideTemplate(UserSkillMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserSkillMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserSkillMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserSkillMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userSkills && comp.userSkills[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
