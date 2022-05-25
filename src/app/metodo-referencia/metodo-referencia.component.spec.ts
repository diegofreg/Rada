import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoReferenciaComponent } from './metodo-referencia.component';

describe('MetodoReferenciaComponent', () => {
  let component: MetodoReferenciaComponent;
  let fixture: ComponentFixture<MetodoReferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetodoReferenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoReferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
