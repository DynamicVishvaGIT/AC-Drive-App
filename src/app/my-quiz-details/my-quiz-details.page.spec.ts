import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyQuizDetailsPage } from './my-quiz-details.page';

describe('MyQuizDetailsPage', () => {
  let component: MyQuizDetailsPage;
  let fixture: ComponentFixture<MyQuizDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQuizDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
