import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { UserSkillMySuffixUpdateComponent } from 'app/entities/user-skill-my-suffix/user-skill-my-suffix-update.component';
import { UserSkillMySuffixService } from 'app/entities/user-skill-my-suffix/user-skill-my-suffix.service';
import { UserSkillMySuffix } from 'app/shared/model/user-skill-my-suffix.model';

describe('Component Tests', () => {
  describe('UserSkillMySuffix Management Update Component', () => {
    let comp: UserSkillMySuffixUpdateComponent;
    let fixture: ComponentFixture<UserSkillMySuffixUpdateComponent>;
    let service: UserSkillMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [UserSkillMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UserSkillMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserSkillMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserSkillMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserSkillMySuffix(123);
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
        const entity = new UserSkillMySuffix();
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
