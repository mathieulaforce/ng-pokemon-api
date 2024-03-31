import { Component, Input } from '@angular/core';
import { PokemonListItem } from '../../../pokemon-shared.service'; 
import { SvgIconComponent } from '../../ui/icons/svg-icon/svg-icon.component';
@Component({
  selector: 'app-pokemon-portrait',
  standalone: true,
  imports: [SvgIconComponent],
  template: `
  <div
        [class]="
          'max-w-56 h-full grid relative justify-center content-center rounded-l-xl bg-' +
          pokemon.types[0].name
        ">
        <div class="absolute left-0 top-0 bottom-0 right-0 overflow-hidden rounded-l-xl">
          <div
            class="absolute opacity-30 size-[150%] bg-gradient-to-br  from-white to-black animate-gradient animate-pulse"
          ></div>
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none w-64"
          >
            <div
              class="absolute overflow-hidden size-[140%] -left-[calc(1rem+20%)] opacity-35  "
            >
              <ui-svg-icon
                path="assets/pokeball.svg"
                class="relative bg-white"
              ></ui-svg-icon>
            </div>
          </div>
        </div>
        <div
          class="z-10 absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none w-64"
        >
          <img
            [src]="pokemon.spriteUrl"
            alt="pokemon sprite"
            class="size-64 "
          />
        </div>
      </div>
  `,
  styles: ``
})
export class PokemonPortraitComponent { 
  @Input() pokemon!: PokemonListItem;
}
