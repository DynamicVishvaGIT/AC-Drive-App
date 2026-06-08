import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewLeadPage } from './add-new-lead.page';

describe('AddNewLeadPage', () => {
  let component: AddNewLeadPage;
  let fixture: ComponentFixture<AddNewLeadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewLeadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
