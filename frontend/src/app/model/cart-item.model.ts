import { Smoothie } from "./smoothie.model";

export class CartItem {
  smoothie: Smoothie;
  quantity: number;
  
  constructor(smoothie: Smoothie, quantity: number) {
    this.smoothie = smoothie;
    this.quantity = quantity;
  }
}