import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { first } from "rxjs";
import { CartItem } from "../_models/cart-item.model";
import { Smoothie } from "../_models/smoothie.model";
import { ApiService } from "./api.service";
import { AuthenticationService } from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private STORAGE_KEY: string = "shopping-cart";
  private cartList: CartItem[];

  constructor(private router: Router, private apiService: ApiService) {
    this.cartList = JSON.parse(localStorage.getItem(this.STORAGE_KEY)!);
  }

  getCartList(): CartItem[] {
    return this.cartList ? this.cartList : [];
  }

  updateCartContent() {
    for (const item of this.getCartList()) {
      const smoothieObserv = this.apiService.getSmoothieById(item.smoothie.id);
      if (!smoothieObserv) { // user does not have permissions
        this.router.navigate(['/login']);
        return;
      }
      
      smoothieObserv.pipe(first()).subscribe({
          next: (element: Smoothie) => {
            this.updateElementInCart(element);
          },
          error: () => {
            this.deleteElementInCart(item.smoothie);
          }
        });
    }
  }

  updateElementInCart(item: Smoothie) {
    const cartList = this.getCartList();
    const idx = cartList.map(i => i.smoothie.id).indexOf(item.id);
    cartList[idx].smoothie = item;

    this.updateCart(cartList);
  }

  deleteElementInCart(item: Smoothie) {
    const cartList = this.getCartList();
    const idx = cartList.map(i => i.smoothie.id).indexOf(item.id);
    cartList.splice(idx, 1);

    this.updateCart(cartList);
  }

  addSmoothieToCart(smoothie: Smoothie) {
    const cartList: CartItem[] = this.getCartList();
    const idx = cartList.map(item => item.smoothie.id).indexOf(smoothie.id);

    if (idx >= 0)
      cartList[idx].quantity++;
    else
      cartList.push(new CartItem(smoothie, 1));
      
    this.updateCart(cartList);
  }

  increaseQuantity(item: CartItem) {
    let cartList: CartItem[] = this.getCartList();
    const idx = cartList.indexOf(item);

    if (idx >= 0) {
      cartList[idx].quantity++;
      this.updateCart(cartList);
    }
  }

  decreaseQuantity(item: CartItem) {
    let cartList: CartItem[] = this.getCartList();
    const idx = cartList.indexOf(item);

    if (idx >= 0) {
      cartList[idx].quantity = Math.max(0, cartList[idx].quantity - 1);
      cartList = cartList.filter(item => item.quantity > 0);

      this.updateCart(cartList);
    }
  }

  clearCart() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    this.cartList = [];
  }

  updateCart(newCartList: CartItem[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newCartList));
    this.cartList = newCartList;
  }

}