import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroMetodorefComponent } from './cadastro-metodoref.component';

describe('CadastroMetodorefComponent', () => {
  let component: CadastroMetodorefComponent;
  let fixture: ComponentFixture<CadastroMetodorefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroMetodorefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroMetodorefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
