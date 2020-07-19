import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { SubCategoryMySuffixUpdateComponent } from 'app/entities/sub-category-my-suffix/sub-category-my-suffix-update.component';
import { SubCategoryMySuffixService } from 'app/entities/sub-category-my-suffix/sub-category-my-suffix.service';
import { SubCategoryMySuffix } from 'app/shared/model/sub-category-my-suffix.model';

describe('Component Tests', () => {
  describe('SubCategoryMySuffix Management Update Component', () => {
    let comp: SubCategoryMySuffixUpdateComponent;
    let fixture: ComponentFixture<SubCategoryMySuffixUpdateComponent>;
    let service: SubCategoryMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [SubCategoryMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SubCategoryMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubCategoryMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubCategoryMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SubCategoryMySuffix(123);
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
        const entity = new SubCategoryMySuffix();
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
