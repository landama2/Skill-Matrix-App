import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { CCUserMySuffixDetailComponent } from 'app/entities/cc-user-my-suffix/cc-user-my-suffix-detail.component';
import { CCUserMySuffix } from 'app/shared/model/cc-user-my-suffix.model';

describe('Component Tests', () => {
  describe('CCUserMySuffix Management Detail Component', () => {
    let comp: CCUserMySuffixDetailComponent;
    let fixture: ComponentFixture<CCUserMySuffixDetailComponent>;
    const route = ({ data: of({ cCUser: new CCUserMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [CCUserMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CCUserMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CCUserMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cCUser on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cCUser).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
