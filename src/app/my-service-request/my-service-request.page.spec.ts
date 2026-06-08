import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyServiceRequestPage } from './my-service-request.page';

describe('MyServiceRequestPage', () => {
  let component: MyServiceRequestPage;
  let fixture: ComponentFixture<MyServiceRequestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyServiceRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
