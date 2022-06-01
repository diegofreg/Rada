import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoagricolaComponent } from './produtoagricola.component';

describe('ProdutoagricolaComponent', () => {
  let component: ProdutoagricolaComponent;
  let fixture: ComponentFixture<ProdutoagricolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoagricolaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoagricolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
