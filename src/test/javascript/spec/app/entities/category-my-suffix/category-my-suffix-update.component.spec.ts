import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { CategoryMySuffixUpdateComponent } from 'app/entities/category-my-suffix/category-my-suffix-update.component';
import { CategoryMySuffixService } from 'app/entities/category-my-suffix/category-my-suffix.service';
import { CategoryMySuffix } from 'app/shared/model/category-my-suffix.model';

describe('Component Tests', () => {
  describe('CategoryMySuffix Management Update Component', () => {
    let comp: CategoryMySuffixUpdateComponent;
    let fixture: ComponentFixture<CategoryMySuffixUpdateComponent>;
    let service: CategoryMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [CategoryMySuffixUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CategoryMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategoryMySuffixUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CategoryMySuffixService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CategoryMySuffix(123);
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
        const entity = new CategoryMySuffix();
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
