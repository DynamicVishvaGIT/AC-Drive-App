import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyResultPage } from './my-result.page';

describe('MyResultPage', () => {
  let component: MyResultPage;
  let fixture: ComponentFixture<MyResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
