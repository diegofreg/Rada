import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordenadoriaComponent } from './coordenadoria.component';

describe('CoordenadoriaComponent', () => {
  let component: CoordenadoriaComponent;
  let fixture: ComponentFixture<CoordenadoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordenadoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordenadoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
