import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvolvidosComponent } from './envolvidos.component';

describe('EnvolvidosComponent', () => {
  let component: EnvolvidosComponent;
  let fixture: ComponentFixture<EnvolvidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvolvidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvolvidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
