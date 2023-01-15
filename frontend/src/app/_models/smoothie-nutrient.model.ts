export class SmoothieNutrient {
  nutrient: {id: number, name: string, unit: number};
  amount: number;

  constructor(nutrient: {id: number, name: string, unit: number}, amount: number) {
    this.nutrient = nutrient;
    this.amount = amount;
  }
}