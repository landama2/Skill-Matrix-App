import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogTestModule } from '../../../test.module';
import { UserRoleMySuffixDetailComponent } from 'app/entities/user-role-my-suffix/user-role-my-suffix-detail.component';
import { UserRoleMySuffix } from 'app/shared/model/user-role-my-suffix.model';

describe('Component Tests', () => {
  describe('UserRoleMySuffix Management Detail Component', () => {
    let comp: UserRoleMySuffixDetailComponent;
    let fixture: ComponentFixture<UserRoleMySuffixDetailComponent>;
    const route = ({ data: of({ userRole: new UserRoleMySuffix(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [UserRoleMySuffixDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UserRoleMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserRoleMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userRole on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userRole).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
