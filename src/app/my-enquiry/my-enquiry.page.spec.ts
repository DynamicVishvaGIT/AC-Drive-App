import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyEnquiryPage } from './my-enquiry.page';

describe('MyEnquiryPage', () => {
  let component: MyEnquiryPage;
  let fixture: ComponentFixture<MyEnquiryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEnquiryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
