export class SmoothieNutrient {
  id: number;
  name: string;
  amount: number;
  unit: string;

  constructor(id: number, name: string, amount: number, unit: string) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.unit = unit;
  }
}