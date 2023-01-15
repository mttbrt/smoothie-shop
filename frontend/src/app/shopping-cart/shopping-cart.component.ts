import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, first } from 'rxjs';
import { CartItem } from '../_models/cart-item.model';
import { OrderItem } from '../_models/order-item.model';
import { Order } from '../_models/order.model';
import { ApiService } from '../_services/api.service';
import { CartService } from '../_services/cart.service';
//TODO: handle smoothie updates and deletions
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styles: ['.btn-success{ float: right; }']
})
export class ShoppingCartComponent {
  cartList: BehaviorSubject<CartItem[]>;

  constructor(private router: Router, private cartService: CartService, private apiService: ApiService) {
    this.cartList = new BehaviorSubject(cartService.getCartList());
  }

  getCartList() {
    return this.cartList.value ? this.cartList.value : [];
  }

  increaseQuantity(item: CartItem) {
    this.cartService.increaseQuantity(item);
  }

  decreaseQuantity(item: CartItem) {
    this.cartService.decreaseQuantity(item);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/cart'])); 
  }

  placeOrder() {
    const smoothies = [];
    for (const item of this.getCartList())
      smoothies.push(new OrderItem(item.smoothie.id, item.quantity));
    const data: Order = new Order(smoothies);

    const orderObserv = this.apiService.createOrder(data);
    if (!orderObserv) { // user does not have permissions
      this.router.navigate(['/login']);
      return;
    }
    
    orderObserv.pipe(first()).subscribe({
        next: () => {
          this.cartService.clearCart();
          alert("Thank you for placing your order.");
          this.router.navigate(['/smoothies']);
        },
        error: () => {
          alert("Error while placing your order.");
          this.router.navigate(['/smoothies']);
        }
      });
  }

  computeSubTotal(price: number, quantity: number) {
    return this.round(price * quantity);
  }

  computeTotal() {
    let sum: number = 0;
    for (const cartItem of this.cartService.getCartList())
      sum += this.computeSubTotal(cartItem.smoothie.price, cartItem.quantity);
    return this.round(sum);
  }

  private round(num: number) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

}
