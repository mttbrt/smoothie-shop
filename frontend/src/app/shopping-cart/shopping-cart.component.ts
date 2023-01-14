import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../model/cart-item.model';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  cartService: CartService;
  
  constructor(cartService: CartService) {
    this.cartService = cartService;
  }

}
