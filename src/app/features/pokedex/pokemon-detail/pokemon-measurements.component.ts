import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ConvertLengthPipe, ConvertWeightPipe } from '../../../dataConversionPipes';
import { PokemonListItem } from '../../pokemon/pokemon-shared.service';

@Component({
  selector: 'app-pokemon-measurements',
  standalone: true,
  imports: [
    ConvertLengthPipe,
    DecimalPipe,
    ConvertWeightPipe,],
  template: `
    <div class="flex flex-row gap-16">
          <div>
            <div class="text-muted-foreground font-light">Height:</div>
            <div class="font-bold">
              {{
                pokemon.details?.height ?? 0
                  | convertLength : 'dm' : 'm'
                  | number : '1.1'
              }}m
            </div>
          </div>
          <div>
            <div class="text-muted-foreground font-light">Weight:</div>
            <div class="font-bold">
              {{
                pokemon.details?.weight ?? 0
                  | convertWeight : 'hg' : 'kg'
                  | number : '1.1'
              }}kg
            </div>
          </div>
        </div>
  `,
  styles: ``
})
export class PokemonMeasurementsComponent {
  @Input() pokemon!: PokemonListItem;
}
