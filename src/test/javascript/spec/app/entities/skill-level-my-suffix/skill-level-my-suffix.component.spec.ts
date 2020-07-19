import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlogTestModule } from '../../../test.module';
import { SkillLevelMySuffixComponent } from 'app/entities/skill-level-my-suffix/skill-level-my-suffix.component';
import { SkillLevelMySuffixService } from 'app/entities/skill-level-my-suffix/skill-level-my-suffix.service';
import { SkillLevelMySuffix } from 'app/shared/model/skill-level-my-suffix.model';

describe('Component Tests', () => {
  describe('SkillLevelMySuffix Management Component', () => {
    let comp: SkillLevelMySuffixComponent;
    let fixture: ComponentFixture<SkillLevelMySuffixComponent>;
    let service: SkillLevelMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [SkillLevelMySuffixComponent]
      })
        .overrideTemplate(SkillLevelMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SkillLevelMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SkillLevelMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SkillLevelMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.skillLevels && comp.skillLevels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
