import { Component, Input } from '@angular/core';
import { PokemonListItem } from '../../../pokemon-shared.service';
import { PadLeftPipe } from '../../../pad-left.pipe';
import { TitleCasePipe } from '@angular/common';
import { PokemonTypeTagDirective } from '../../ui/pokemon-type-tag.directive';

@Component({
  selector: 'app-pokemon-header',
  standalone: true,
  imports: [PadLeftPipe, TitleCasePipe, PokemonTypeTagDirective],
  template: `
    <div class="flex flex-col gap-2">
          <h1 class="text-3xl font-bold">
            <span class="text-sm text-muted-foreground font-light"
              >No. {{ pokemon.id | padLeft : '0' : 3 }}</span
            >
            {{ pokemon.name | titlecase }}
          </h1>
          <div class="flex flex-row gap-2">
            @for (type of pokemon.types; track type) {
            <div uiPokemonTypeTag [variant]="type.name" class="border-none">
              {{ type.name | titlecase }}
            </div>
            }
          </div>
        </div>
  `,
  styles: ``
})
export class PokemonHeaderComponent {
  @Input() pokemon!: PokemonListItem;
}
