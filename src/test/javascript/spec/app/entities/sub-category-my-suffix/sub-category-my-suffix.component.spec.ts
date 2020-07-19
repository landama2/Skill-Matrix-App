import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlogTestModule } from '../../../test.module';
import { SubCategoryMySuffixComponent } from 'app/entities/sub-category-my-suffix/sub-category-my-suffix.component';
import { SubCategoryMySuffixService } from 'app/entities/sub-category-my-suffix/sub-category-my-suffix.service';
import { SubCategoryMySuffix } from 'app/shared/model/sub-category-my-suffix.model';

describe('Component Tests', () => {
  describe('SubCategoryMySuffix Management Component', () => {
    let comp: SubCategoryMySuffixComponent;
    let fixture: ComponentFixture<SubCategoryMySuffixComponent>;
    let service: SubCategoryMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [SubCategoryMySuffixComponent]
      })
        .overrideTemplate(SubCategoryMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubCategoryMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubCategoryMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SubCategoryMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.subCategories && comp.subCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
