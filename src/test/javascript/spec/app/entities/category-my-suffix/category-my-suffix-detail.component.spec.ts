import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { CategoryMySuffixDetailComponent } from 'app/entities/category-my-suffix/category-my-suffix-detail.component';
import { CategoryMySuffix } from 'app/shared/model/category-my-suffix.model';

describe('Component Tests', () => {
  describe('CategoryMySuffix Management Detail Component', () => {
    let comp: CategoryMySuffixDetailComponent;
    let fixture: ComponentFixture<CategoryMySuffixDetailComponent>;
    const route = ({ data: of({ category: new CategoryMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [CategoryMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CategoryMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CategoryMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load category on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.category).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
