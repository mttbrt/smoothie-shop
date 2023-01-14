import { Injectable } from "@angular/core";
import { CartItem } from "../model/cart-item.model";
import { Smoothie } from "../model/smoothie.model";

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartList: CartItem[] = [];

  getCartList() {
    return this.cartList;
  }

  addSmoothieToCart(smoothie: Smoothie) {
    for (const element of this.cartList) {
      if (element.smoothie.id == smoothie.id) {
        element.quantity++;
        return;
      }
    }

    this.cartList.push(new CartItem(smoothie, 1));
  }

  increaseQuantity(item: CartItem) {
    for (const element of this.cartList) {
      if (element.smoothie.id == item.smoothie.id) {
        element.quantity++;
        return;
      }
    }
  }

  decreaseQuantity(item: CartItem) {
    for (const element of this.cartList) {
      if (element.smoothie.id == item.smoothie.id) {
        if (element.quantity > 0)
          element.quantity--;
        return;
      }
    }
    
    this.cartList = this.cartList.filter(element => element.quantity == 0);
  }

}