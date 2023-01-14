import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { ClickSmoothie, Operation } from '../../model/click-smoothie.model';
import { Smoothie } from '../../model/smoothie.model';

@Component({
  selector: 'app-smoothie-list-item',
  templateUrl: './smoothie-list-item.component.html',
  styleUrls: ['./smoothie-list-item.component.css']
})
export class SmoothieListItemComponent {
  @Input() smoothie: Smoothie;
  @Output() onSmoothieClick = new EventEmitter<ClickSmoothie>();

  constructor(private cartService: CartService) {}

  onViewSmoothie() {
    this.onSmoothieClick.emit(new ClickSmoothie(this.smoothie, Operation.VIEW));
  }

  onAddSmoothieToCart() {
    this.cartService.addSmoothieToCart(this.smoothie);
  }

  onEditSmoothie() {
    this.onSmoothieClick.emit(new ClickSmoothie(this.smoothie, Operation.EDIT));
  }

  onDeleteSmoothie() {
    this.onSmoothieClick.emit(new ClickSmoothie(this.smoothie, Operation.DELETE));
  }
}
