import { Component, Output, EventEmitter } from '@angular/core';
import { ClickSmoothie, Operation } from '../model/click-smoothie.model';
import { Smoothie } from '../model/smoothie.model';

@Component({
  selector: 'app-smoothies',
  templateUrl: './smoothies.component.html',
  styleUrls: ['./smoothies.component.css']
})
export class SmoothiesComponent {
  smoothies: Smoothie[];
  clickedSmoothie: ClickSmoothie;

  constructor() {
    this.smoothies = [
      new Smoothie(1, "test1", 1.23),
      new Smoothie(2, "test2", 3.23)
    ];
    this.clickedSmoothie = new ClickSmoothie(this.smoothies[0], Operation.VIEW);
  }

  onSmoothieClick(clickedSmoothie: ClickSmoothie) {
    switch (clickedSmoothie.operation) {
      case Operation.VIEW:
        this.clickedSmoothie = clickedSmoothie;
        break;
      case Operation.EDIT:
        // TODO: only if user is ROLE_OWNER
        this.clickedSmoothie = clickedSmoothie;
        break;
      case Operation.DELETE:
        console.log("Delete only if user is ROLE_OWNER");
        break;
    }
    
  }
}
