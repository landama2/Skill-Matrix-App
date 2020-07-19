import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlogTestModule } from '../../../test.module';
import { UserRoleMySuffixComponent } from 'app/entities/user-role-my-suffix/user-role-my-suffix.component';
import { UserRoleMySuffixService } from 'app/entities/user-role-my-suffix/user-role-my-suffix.service';
import { UserRoleMySuffix } from 'app/shared/model/user-role-my-suffix.model';

describe('Component Tests', () => {
  describe('UserRoleMySuffix Management Component', () => {
    let comp: UserRoleMySuffixComponent;
    let fixture: ComponentFixture<UserRoleMySuffixComponent>;
    let service: UserRoleMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BlogTestModule],
        declarations: [UserRoleMySuffixComponent]
      })
        .overrideTemplate(UserRoleMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserRoleMySuffixComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserRoleMySuffixService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserRoleMySuffix(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userRoles && comp.userRoles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
