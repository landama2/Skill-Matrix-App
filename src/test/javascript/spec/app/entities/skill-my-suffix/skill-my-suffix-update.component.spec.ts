import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { SkillMySuffixUpdateComponent } from 'app/entities/skill-my-suffix/skill-my-suffix-update.component';
import { SkillMySuffixService } from 'app/entities/skill-my-suffix/skill-my-suffix.service';
import { SkillMySuffix } from 'app/shared/model/skill-my-suffix.model';

describe('Component Tests', () => {
  describe('SkillMySuffix Management Update Component', () => {
    let comp: SkillMySuffixUpdateComponent;
    let fixture: ComponentFixture<SkillMySuffixUpdateComponent>;
    let service: SkillMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [SkillMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SkillMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SkillMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SkillMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SkillMySuffix(123);
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
        const entity = new SkillMySuffix();
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
