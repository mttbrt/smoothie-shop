import { Component, Input, SimpleChanges } from '@angular/core';
import { SmoothieNutrient } from 'src/app/model/smoothie-nutrient.model';
import { ClickSmoothie } from '../../model/click-smoothie.model';
import { Operation } from '../../model/click-smoothie.model';

@Component({
  selector: 'app-smoothie-details',
  templateUrl: './smoothie-details.component.html',
  styleUrls: ['./smoothie-details.component.css']
})
export class SmoothieDetailsComponent {
  @Input() clickedSmoothie: ClickSmoothie;
  nutritionalValues: SmoothieNutrient[];
  Operation = Operation;

  onSaveSmoothie() {
    console.log("SAVE");
  }

  ngOnChanges(changes: SimpleChanges) {
    // TODO: replace with get request
    if (changes['clickedSmoothie'].currentValue.smoothie.id == 1) {
      this.nutritionalValues = [
        new SmoothieNutrient(1, "Calories", 294, "kcal"),
        new SmoothieNutrient(2, "Carbs", 20, "g"),
        new SmoothieNutrient(3, "Proteins", 4, "g")
      ]
    } else if (changes['clickedSmoothie'].currentValue.smoothie.id == 2) {
      this.nutritionalValues = [
        new SmoothieNutrient(1, "Calories", 563, "kcal"),
        new SmoothieNutrient(2, "Carbs", 56, "g"),
        new SmoothieNutrient(3, "Proteins", 6, "g")
      ]
    }
  }
}
