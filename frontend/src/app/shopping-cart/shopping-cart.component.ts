import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../_models/cart-item.model';
import { CartService } from '../_services/cart.service';

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
