import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceRequestSuccessPage } from './service-request-success.page';

describe('ServiceRequestSuccessPage', () => {
  let component: ServiceRequestSuccessPage;
  let fixture: ComponentFixture<ServiceRequestSuccessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRequestSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
