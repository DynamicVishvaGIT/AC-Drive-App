import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VdfSelectToolPage } from './vdf-select-tool.page';

describe('VdfSelectToolPage', () => {
  let component: VdfSelectToolPage;
  let fixture: ComponentFixture<VdfSelectToolPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VdfSelectToolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
