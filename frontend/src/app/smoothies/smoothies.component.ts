import { Component, } from '@angular/core';
import { Router, } from '@angular/router';
import { first } from 'rxjs';
import { ClickSmoothie, Operation } from '../_models/click-smoothie.model';
import { Smoothie } from '../_models/smoothie.model';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-smoothies',
  templateUrl: './smoothies.component.html'
})
export class SmoothiesComponent {
  smoothies: Smoothie[] = [];
  smoothieOnFocus: Smoothie;
  edit: boolean = false;

  constructor(private router: Router, private apiService: ApiService) {
    const smoothiesObserv = this.apiService.getSmoothies();
    if (!smoothiesObserv) { // user does not have permissions
      this.router.navigate(['/login']);
      return;
    }

    smoothiesObserv.pipe(first()).subscribe({
      next: (smoothies: Smoothie[]) => {
        this.smoothies = smoothies;
        this.smoothieOnFocus = this.smoothies[0];
      },
      error: () => {
        this.smoothies = [];
      }
    });
  }

  smoothieClicked(event: {smoothie: Smoothie, edit: boolean}) {
    this.smoothieOnFocus = event.smoothie;
    this.edit = event.edit;
  }

  onRefresh() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/smoothies']));
  }
}
