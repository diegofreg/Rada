import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAmostraComponent } from './registro-amostra.component';

describe('RegistroAmostraComponent', () => {
  let component: RegistroAmostraComponent;
  let fixture: ComponentFixture<RegistroAmostraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroAmostraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAmostraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
