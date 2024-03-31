import { Pipe, PipeTransform } from '@angular/core';

const lengthConversionFactors = {
  mm: 1,
  cm: 0.1,
  dm: 0.01,
  m: 0.001,
  km: 0.000001 
};
 
export type LenghtUnit = keyof typeof lengthConversionFactors;

@Pipe({
  name: 'convertLength',
  standalone: true
})
export class ConvertLengthPipe implements PipeTransform {
   
  transform(value: number, fromUnit: LenghtUnit, toUnit: LenghtUnit): number { 
    const conversionFactor = this.getConversionFactor(toUnit) / this.getConversionFactor(fromUnit);
    const result = (value * conversionFactor);
    return result; 
  }

  private getConversionFactor(unit: LenghtUnit): number {
    return lengthConversionFactors[unit] || 1;
  }
}
const weightConversionFactors = {
  mg: 1,
  cg: 0.1,
  dg: 0.01,
  g: 0.001,
  dag: 0.0001,
  hg: 0.00001, 
  kg: 0.000001 
};
 
export type WeightUnit = keyof typeof weightConversionFactors;

@Pipe({
  name: 'convertWeight',
  standalone: true
})
export class ConvertWeightPipe implements PipeTransform {
   
  transform(value: number, fromUnit: WeightUnit, toUnit: WeightUnit): number { 
    const conversionFactor = this.getConversionFactor(toUnit) / this.getConversionFactor(fromUnit);
    const result = (value * conversionFactor);
    return result; 
  }

  private getConversionFactor(unit: WeightUnit): number {
    return weightConversionFactors[unit] || 1;
  }
}