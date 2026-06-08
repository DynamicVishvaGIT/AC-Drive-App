import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyEnquiryDetailsPage } from './my-enquiry-details.page';

describe('MyEnquiryDetailsPage', () => {
  let component: MyEnquiryDetailsPage;
  let fixture: ComponentFixture<MyEnquiryDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEnquiryDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
