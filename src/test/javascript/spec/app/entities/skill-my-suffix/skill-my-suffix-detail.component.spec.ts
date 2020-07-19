import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { SkillMySuffixDetailComponent } from 'app/entities/skill-my-suffix/skill-my-suffix-detail.component';
import { SkillMySuffix } from 'app/shared/model/skill-my-suffix.model';

describe('Component Tests', () => {
  describe('SkillMySuffix Management Detail Component', () => {
    let comp: SkillMySuffixDetailComponent;
    let fixture: ComponentFixture<SkillMySuffixDetailComponent>;
    const route = ({ data: of({ skill: new SkillMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [SkillMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SkillMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SkillMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load skill on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.skill).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
