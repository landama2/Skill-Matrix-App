import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { UserRoleMySuffixUpdateComponent } from 'app/entities/user-role-my-suffix/user-role-my-suffix-update.component';
import { UserRoleMySuffixService } from 'app/entities/user-role-my-suffix/user-role-my-suffix.service';
import { UserRoleMySuffix } from 'app/shared/model/user-role-my-suffix.model';

describe('Component Tests', () => {
  describe('UserRoleMySuffix Management Update Component', () => {
    let comp: UserRoleMySuffixUpdateComponent;
    let fixture: ComponentFixture<UserRoleMySuffixUpdateComponent>;
    let service: UserRoleMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [UserRoleMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UserRoleMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserRoleMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserRoleMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserRoleMySuffix(123);
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
        const entity = new UserRoleMySuffix();
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
