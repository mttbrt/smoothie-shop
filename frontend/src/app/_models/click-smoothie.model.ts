import { Smoothie } from "./smoothie.model";

export class ClickSmoothie {
  smoothie: Smoothie;
  operation: Operation;
  
  constructor(smoothie: Smoothie, operation: Operation) {
    this.smoothie = smoothie;
    this.operation = operation;
  }
}

export enum Operation {
  VIEW,
  EDIT
}