import { OrderItem } from "./order-item.model";

export class Order {
  smoothies: OrderItem[];

  constructor(smoothies: OrderItem[]) {
    this.smoothies = smoothies;
  }
}