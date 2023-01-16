import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../../_services/cart.service';
import { Smoothie } from '../../_models/smoothie.model';
import { AuthenticationService } from 'src/app/_services/auth.service';
import { ApiService } from 'src/app/_services/api.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-smoothie-list-item',
  templateUrl: './smoothie-list-item.component.html',
  styleUrls: ['./smoothie-list-item.component.css']
})
export class SmoothieListItemComponent {
  @Input() displaySmoothie: Smoothie;
  @Output() onClickSmoothie = new EventEmitter<{smoothie: Smoothie, edit: boolean}>();
  @Output() onRefresh = new EventEmitter<any>();

  constructor(
    private router: Router, 
    private cartService: CartService,
    private authService: AuthenticationService,
    private apiService: ApiService) {}

  onViewSmoothie() {
    this.onClickSmoothie.emit({smoothie: this.displaySmoothie, edit: false});
  }

  onEditSmoothie() {
    this.onClickSmoothie.emit({smoothie: this.displaySmoothie, edit: true});
  }

  onAddSmoothieToCart() {
    this.cartService.addSmoothieToCart(this.displaySmoothie);
  }
  
  onDeleteSmoothie() {
    const deleteObserv = this.apiService.deleteSmoothieById(this.displaySmoothie.id);
    if (!deleteObserv) { // user does not have permissions
      this.router.navigate(['/login']);
      return;
    }
    
    deleteObserv.pipe(first()).subscribe({
        next: () => {
          this.onRefresh.emit();
        },
        error: () => {
          alert("Error while deleting smoothie.");
        }
      });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  hasRole(role: string) {
    return this.authService.getRoles().indexOf(role) >= 0;
  }
}
