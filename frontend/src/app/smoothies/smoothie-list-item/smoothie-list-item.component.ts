import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../../_services/cart.service';
import { ClickSmoothie, Operation } from '../../_models/click-smoothie.model';
import { Smoothie } from '../../_models/smoothie.model';
import { AuthenticationService } from 'src/app/_services/auth.service';
import { ApiService } from 'src/app/_services/api.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-smoothie-list-item',
  templateUrl: './smoothie-list-item.component.html',
  styleUrls: ['./smoothie-list-item.component.css']
})
export class SmoothieListItemComponent {
  @Input() smoothie: Smoothie;
  @Output() onSmoothieClick = new EventEmitter<ClickSmoothie>();
  @Output() onRefresh = new EventEmitter<any>();

  constructor(private cartService: CartService,
    private authService: AuthenticationService,
    private apiService: ApiService) {}

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
    this.apiService.deleteSmoothieById(this.smoothie.id).subscribe(
      (data) => {
        console.log(data);
        this.onRefresh.emit();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  isUser() {
    return this.authService.getRoles().indexOf("USER") != -1;
  }

  isOwner() {
    return this.authService.getRoles().indexOf("OWNER") != -1;
  }
}
