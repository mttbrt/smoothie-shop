import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SmoothieNutrient } from 'src/app/_models/smoothie-nutrient.model';
import { ApiService } from 'src/app/_services/api.service';
import { AuthenticationService } from 'src/app/_services/auth.service';
import { ClickSmoothie } from '../../_models/click-smoothie.model';
import { Operation } from '../../_models/click-smoothie.model';

@Component({
  selector: 'app-smoothie-details',
  templateUrl: './smoothie-details.component.html',
  styleUrls: ['./smoothie-details.component.css']
})
export class SmoothieDetailsComponent {
  @Input() clickedSmoothie: ClickSmoothie;
  nutritionalValues: SmoothieNutrient[];
  Operation = Operation;

  constructor(private authService: AuthenticationService, private apiService: ApiService) {}

  onSaveSmoothie() {
    console.log("SAVE");
  }

  ngOnChanges() {
    this.apiService.getSmoothieNutritionalValues(this.clickedSmoothie.smoothie.id)
    .subscribe((nutritionalValues: SmoothieNutrient[]) => {
      this.nutritionalValues = nutritionalValues;
    }, (err) => {
      console.log(err);
      this.nutritionalValues = [];
    });
  }

  isUser() {
    return this.authService.getRoles().indexOf("USER") != -1;
  }

  isOwner() {
    return this.authService.getRoles().indexOf("OWNER") != -1;
  }
}
