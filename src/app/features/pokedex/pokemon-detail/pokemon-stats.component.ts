import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PokemonListItem } from '../../pokemon/pokemon-shared.service';

@Component({
  selector: 'app-pokemon-stats',
  standalone: true,
  imports: [TitleCasePipe],
  template: `
    <h2 class="pb-2 text-lg">Stats</h2>
    <div class="grid grid-cols-[minmax(120px,1fr)_minmax(220px,1fr)]  gap-2">
      @for (stat of pokemon.details!.stats; track stat) {

      <div class="text-muted-foreground font-light">
        {{ stat.stat.name | titlecase }}
      </div>
      <div class="w-full pr-8 py-2">
        <div class="size-full bg-gray-300 rounded-md relative">
          <ul class="size-full absolute left-0  ">
            <li class="w-1 h-full bg-background absolute left-[25%]"></li>
            <li class="w-1 h-full bg-background absolute left-[50%]"></li>
            <li class="w-1 h-full bg-background absolute left-[75%]"></li> 
          </ul>
          <div
            class="bg-pokedexRed rounded-md size-full"
            [style.width.%]="(stat.base_stat / 255) * 100"
          ></div>
        </div>
      </div>
      }
    </div>
  `,
  styles: ``,
})
export class PokemonStatsComponent {
  @Input() pokemon!: PokemonListItem;
}
