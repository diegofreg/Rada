import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnCodeDialogComponent } from './return-code-dialog.component';

describe('ReturnCodeDialogComponent', () => {
  let component: ReturnCodeDialogComponent;
  let fixture: ComponentFixture<ReturnCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnCodeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
