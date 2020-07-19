import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { SubCategoryMySuffixDetailComponent } from 'app/entities/sub-category-my-suffix/sub-category-my-suffix-detail.component';
import { SubCategoryMySuffix } from 'app/shared/model/sub-category-my-suffix.model';

describe('Component Tests', () => {
  describe('SubCategoryMySuffix Management Detail Component', () => {
    let comp: SubCategoryMySuffixDetailComponent;
    let fixture: ComponentFixture<SubCategoryMySuffixDetailComponent>;
    const route = ({ data: of({ subCategory: new SubCategoryMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [SubCategoryMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SubCategoryMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubCategoryMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load subCategory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.subCategory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
