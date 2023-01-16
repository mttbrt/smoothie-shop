import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { SmoothieNutrient } from 'src/app/_models/smoothie-nutrient.model';
import { SmoothieUpdate } from 'src/app/_models/smoothie-update.model';
import { Smoothie } from 'src/app/_models/smoothie.model';
import { ApiService } from 'src/app/_services/api.service';
import { AuthenticationService } from 'src/app/_services/auth.service';
import { Operation } from '../../_models/click-smoothie.model';

@Component({
  selector: 'app-smoothie-details',
  templateUrl: './smoothie-details.component.html',
  styles: ['input { margin-bottom: 0.5em; }']
})
export class SmoothieDetailsComponent implements OnInit {
  @Input() edit: boolean;
  @Input() smoothie: Smoothie;
  private copyOfSmoothie: Smoothie;
  @Output() onRefresh = new EventEmitter<any>();

  nutritionalValues: SmoothieNutrient[];
  Operation = Operation;

  constructor(private router: Router, private authService: AuthenticationService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.copyOfSmoothie = structuredClone(this.smoothie);
  }

  onSmoothieNameChange(event: any) {
    this.copyOfSmoothie.name = event.target.value;
  }

  onSmoothiePriceChange(event: any) {
    this.copyOfSmoothie.price = event.target.value;
  }

  onSaveSmoothie() {
    const updateSmoothieObserv = this.apiService.updateSmoothieById(this.smoothie.id,
      new SmoothieUpdate(this.copyOfSmoothie.name, this.copyOfSmoothie.price));
    if (!updateSmoothieObserv) { // user does not have permissions
      this.router.navigate(['/login']);
      return;
    }
    
    updateSmoothieObserv.pipe(first()).subscribe({
        next: () => {
          this.onRefresh.emit();
        },
        error: () => {
          alert("Error while updating smoothie.");
        }
      });
  }

  ngOnChanges() {
    this.copyOfSmoothie = structuredClone(this.smoothie);

    const smoothieNutValObserv = this.apiService.getSmoothieNutritionalValues(this.smoothie.id);
    if (!smoothieNutValObserv) { // user does not have permissions
      this.router.navigate(['/login']);
      return;
    }
    
    smoothieNutValObserv.pipe(first()).subscribe({
        next: (nutritionalValues) => {
          this.nutritionalValues = nutritionalValues;
        },
        error: () => {
          this.nutritionalValues = [];
          alert("Error while retrieving nutritional values.");
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
