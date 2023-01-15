import { Component, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { ClickSmoothie, Operation } from '../_models/click-smoothie.model';
import { Smoothie } from '../_models/smoothie.model';
import { ApiService } from '../_services/api.service';
import { AuthenticationService } from '../_services/auth.service';

@Component({
  selector: 'app-smoothies',
  templateUrl: './smoothies.component.html',
  styleUrls: ['./smoothies.component.css']
})
export class SmoothiesComponent {
  smoothies: Smoothie[];
  clickedSmoothie: ClickSmoothie;

  constructor(private router: Router, private apiService: ApiService) {
    apiService.getSmoothies().subscribe((smoothies: Smoothie[]) => {
      this.smoothies = smoothies;
      this.clickedSmoothie = new ClickSmoothie(this.smoothies[0], Operation.VIEW);
    }, (err) => {
      console.log(err);
      this.smoothies = [];
    });
  }

  onSmoothieClick(clickedSmoothie: ClickSmoothie) {
    switch (clickedSmoothie.operation) {
      case Operation.VIEW:
        this.clickedSmoothie = clickedSmoothie;
        break;
      case Operation.EDIT:
        this.clickedSmoothie = clickedSmoothie;
        break;
    }
    
  }

  onRefresh() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/smoothies']);
    });
  }
}
