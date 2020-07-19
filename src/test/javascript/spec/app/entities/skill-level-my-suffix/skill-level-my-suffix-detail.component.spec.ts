import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { SkillLevelMySuffixDetailComponent } from 'app/entities/skill-level-my-suffix/skill-level-my-suffix-detail.component';
import { SkillLevelMySuffix } from 'app/shared/model/skill-level-my-suffix.model';

describe('Component Tests', () => {
  describe('SkillLevelMySuffix Management Detail Component', () => {
    let comp: SkillLevelMySuffixDetailComponent;
    let fixture: ComponentFixture<SkillLevelMySuffixDetailComponent>;
    const route = ({ data: of({ skillLevel: new SkillLevelMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [SkillLevelMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SkillLevelMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SkillLevelMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load skillLevel on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.skillLevel).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
