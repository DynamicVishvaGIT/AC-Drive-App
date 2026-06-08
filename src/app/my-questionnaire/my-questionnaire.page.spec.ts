import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyQuestionnairePage } from './my-questionnaire.page';

describe('MyQuestionnairePage', () => {
  let component: MyQuestionnairePage;
  let fixture: ComponentFixture<MyQuestionnairePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQuestionnairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
