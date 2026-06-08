import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyLeadsPage } from './my-leads.page';

describe('MyLeadsPage', () => {
  let component: MyLeadsPage;
  let fixture: ComponentFixture<MyLeadsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLeadsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
