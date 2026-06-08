import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainingRegistrationPage } from './training-registration.page';

describe('TrainingRegistrationPage', () => {
  let component: TrainingRegistrationPage;
  let fixture: ComponentFixture<TrainingRegistrationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
