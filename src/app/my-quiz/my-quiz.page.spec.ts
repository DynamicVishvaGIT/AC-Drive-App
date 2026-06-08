import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyQuizPage } from './my-quiz.page';

describe('MyQuizPage', () => {
  let component: MyQuizPage;
  let fixture: ComponentFixture<MyQuizPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQuizPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
