import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartBlocComponent } from './cart-bloc.component';

describe('CartBlocComponent', () => {
  let component: CartBlocComponent;
  let fixture: ComponentFixture<CartBlocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartBlocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
