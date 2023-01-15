import { Injectable } from "@angular/core";
import { CartItem } from "../model/cart-item.model";
import { Smoothie } from "../model/smoothie.model";

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private key: string = "shopping-cart";

  getCartList(): CartItem[] {
    const storageVal = localStorage.getItem(this.key);
    return storageVal ? JSON.parse(storageVal) : []
  }

  addSmoothieToCart(smoothie: Smoothie) {
    let cartList: CartItem[] = this.getCartList();
    let found: boolean = false;

    for (const element of cartList) {
      if (element.smoothie.id == smoothie.id) {
        element.quantity++;
        found = true;
        break;
      }
    }

    if (!found)
      cartList.push(new CartItem(smoothie, 1));
    
    localStorage.setItem(this.key, JSON.stringify(cartList));
  }

  increaseQuantity(item: CartItem) {
    let cartList: CartItem[] = this.getCartList();
    let found: boolean = false;

    for (const element of cartList) {
      if (element.smoothie.id == item.smoothie.id) {
        element.quantity++;
        found = true;
        break;
      }
    }

    if (found)
      localStorage.setItem(this.key, JSON.stringify(cartList));
  }

  decreaseQuantity(item: CartItem) {
    let cartList: CartItem[] = this.getCartList();
    let found: boolean = false;

    for (const element of cartList) {
      if (element.smoothie.id == item.smoothie.id) {
        if (element.quantity > 0) {
          element.quantity--;
          found = true;
        }
        break;
      }
    }
    
    if (found) {
      cartList = cartList.filter(element => element.quantity > 0);
      localStorage.setItem(this.key, JSON.stringify(cartList));
    }
  }

}