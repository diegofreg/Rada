import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarMetodorefComponent } from './pesquisar-metodoref.component';

describe('PesquisarMetodorefComponent', () => {
  let component: PesquisarMetodorefComponent;
  let fixture: ComponentFixture<PesquisarMetodorefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesquisarMetodorefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisarMetodorefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
