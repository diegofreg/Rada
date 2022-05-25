import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalizadoComponent } from './fiscalizado.component';

describe('FiscalizadoComponent', () => {
  let component: FiscalizadoComponent;
  let fixture: ComponentFixture<FiscalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiscalizadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiscalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
