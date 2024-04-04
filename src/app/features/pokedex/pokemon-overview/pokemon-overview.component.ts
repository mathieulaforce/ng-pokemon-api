import { Component } from '@angular/core';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { PokemonFilterComponent } from '../../pokemon/components/pokemon-filter/pokemon-filter.component';
@Component({
  selector: 'app-pokemon-overview',
  standalone: true,
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-2 items-center">
        <img src="assets/pokeball.svg" class="size-5" />
        <h1 class="text-3xl font-bold text-card ">Pokédex</h1>
      </div>
      <div>
        <app-pokemon-filter></app-pokemon-filter>
      </div>
      <div>
        <app-pokemon-list></app-pokemon-list>
      </div>
    </div>
  `,
  styles: ``,
  imports: [PokemonListComponent, PokemonFilterComponent],
})
export class PokemonOverviewComponent {}
