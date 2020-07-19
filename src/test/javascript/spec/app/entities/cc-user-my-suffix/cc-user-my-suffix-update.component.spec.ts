import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { CCUserMySuffixUpdateComponent } from 'app/entities/cc-user-my-suffix/cc-user-my-suffix-update.component';
import { CCUserMySuffixService } from 'app/entities/cc-user-my-suffix/cc-user-my-suffix.service';
import { CCUserMySuffix } from 'app/shared/model/cc-user-my-suffix.model';

describe('Component Tests', () => {
  describe('CCUserMySuffix Management Update Component', () => {
    let comp: CCUserMySuffixUpdateComponent;
    let fixture: ComponentFixture<CCUserMySuffixUpdateComponent>;
    let service: CCUserMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [CCUserMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CCUserMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CCUserMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CCUserMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CCUserMySuffix(123);
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
        const entity = new CCUserMySuffix();
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
