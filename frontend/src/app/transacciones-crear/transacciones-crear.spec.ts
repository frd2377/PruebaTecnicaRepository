import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionesCrear } from './transacciones-crear';

describe('TransaccionesCrear', () => {
  let component: TransaccionesCrear;
  let fixture: ComponentFixture<TransaccionesCrear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransaccionesCrear]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransaccionesCrear);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
