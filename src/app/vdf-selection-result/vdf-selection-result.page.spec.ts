import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VdfSelectionResultPage } from './vdf-selection-result.page';

describe('VdfSelectionResultPage', () => {
  let component: VdfSelectionResultPage;
  let fixture: ComponentFixture<VdfSelectionResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VdfSelectionResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
