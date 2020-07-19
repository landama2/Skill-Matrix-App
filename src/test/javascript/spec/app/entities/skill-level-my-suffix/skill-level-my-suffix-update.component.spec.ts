import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { SkillLevelMySuffixUpdateComponent } from 'app/entities/skill-level-my-suffix/skill-level-my-suffix-update.component';
import { SkillLevelMySuffixService } from 'app/entities/skill-level-my-suffix/skill-level-my-suffix.service';
import { SkillLevelMySuffix } from 'app/shared/model/skill-level-my-suffix.model';

describe('Component Tests', () => {
  describe('SkillLevelMySuffix Management Update Component', () => {
    let comp: SkillLevelMySuffixUpdateComponent;
    let fixture: ComponentFixture<SkillLevelMySuffixUpdateComponent>;
    let service: SkillLevelMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [SkillLevelMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SkillLevelMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SkillLevelMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SkillLevelMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SkillLevelMySuffix(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new SkillLevelMySuffix();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
