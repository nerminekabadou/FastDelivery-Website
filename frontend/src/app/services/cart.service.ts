import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  // A BehaviorSubject is an RxJS subject that keeps track of the current value of the cart.
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() {}

  addToCart(food: Food): void { //if already exists, add quantity, otherwise add food
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      this.cart.items.push(new CartItem(food));
    }
    this.setCartToLocalStorage(); 
  }

  removeFromCart(foodId: number): void {
    this.cart.items = this.cart.items.filter(item => item.food.id !== foodId);
    this.setCartToLocalStorage();
  } 

  changeQuantity(foodId: number, quantity: number): void {
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    this.setCartToLocalStorage(); // to correctly update total price
  }

  clearCart(): void {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  private setCartToLocalStorage(): void {
    //  Correctly recalculates total price based on `food.price * quantity`
    this.cart.totalPrice = this.cart.items.reduce((sum, item) => sum + (item.food.price * item.quantity), 0);
    this.cart.totalCount = this.cart.items.reduce((sum, item) => sum + item.quantity, 0);

    console.log(`Cart Updated - Total Price: ${this.cart.totalPrice}, Total Count: ${this.cart.totalCount}`);

    localStorage.setItem('Cart', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
