import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CartItem } from "../_models/cart-item.model";
import { Smoothie } from "../_models/smoothie.model";

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private STORAGE_KEY: string = "shopping-cart";
  private cartSubject: BehaviorSubject<CartItem[] | null>;

  constructor() {
    this.cartSubject = new BehaviorSubject(JSON.parse(localStorage.getItem(this.STORAGE_KEY)!));
  }

  getCartList(): CartItem[] {
    return this.cartSubject.value ? this.cartSubject.value : [];
  }

  addSmoothieToCart(smoothie: Smoothie) {
    const cartList: CartItem[] = this.getCartList();
    const idx = cartList.map(item => item.smoothie.id).indexOf(smoothie.id);

    if (idx >= 0)
      cartList[idx].quantity++;
    else
      cartList.push(new CartItem(smoothie, 1));
      
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cartList));
    this.cartSubject.next(cartList);
  }

  increaseQuantity(item: CartItem) {
    let cartList: CartItem[] = this.getCartList();
    const idx = cartList.indexOf(item);

    if (idx >= 0) {
      cartList[idx].quantity++;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cartList));
      this.cartSubject.next(cartList);
    }
  }

  decreaseQuantity(item: CartItem) {
    let cartList: CartItem[] = this.getCartList();
    const idx = cartList.indexOf(item);

    if (idx >= 0) {
      cartList[idx].quantity = Math.max(0, cartList[idx].quantity - 1);
      cartList = cartList.filter(item => item.quantity > 0);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cartList));
      this.cartSubject.next(cartList);
    }
  }

  clearCart() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    this.cartSubject.next([]);
  }

}