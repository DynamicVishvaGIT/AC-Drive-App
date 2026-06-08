import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyNewEnquiryPage } from './my-new-enquiry.page';

describe('MyNewEnquiryPage', () => {
  let component: MyNewEnquiryPage;
  let fixture: ComponentFixture<MyNewEnquiryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNewEnquiryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
