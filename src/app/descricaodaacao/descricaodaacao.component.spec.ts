import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaodaacaoComponent } from './descricaodaacao.component';

describe('DescricaodaacaoComponent', () => {
  let component: DescricaodaacaoComponent;
  let fixture: ComponentFixture<DescricaodaacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescricaodaacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescricaodaacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
