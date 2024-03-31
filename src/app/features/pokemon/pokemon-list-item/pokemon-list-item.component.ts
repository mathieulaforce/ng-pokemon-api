import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PadLeftPipe } from '../../../pad-left.pipe';
import { PokemonListItem } from '../../../pokemon-shared.service';
import { PokemonTypeTagDirective } from '../../ui/pokemon-type-tag.directive';
import { SkeletonDirective } from '../../ui/skeleton.directive';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common'
import CardDirectives from '../../ui/card';
@Component({
  selector: 'app-pokemon-list-item',
  standalone: true,
  template: `
    <div
      uiCard
      class="
      cursor-pointer 
      hover:scale-105 hover:shadow-lg transition-all duration-500 ease-in-out " 
    >
      <div uiCardHeader class="text-center">
        <div uiCardDescription>
          No. {{ pokemon.id | padLeft : '0' : 3 }}
        </div>
        <div  uiCardTitle class="font-medium text-xl">{{ pokemon.name | titlecase }}</div>
      </div>
      <div uiCardContent class="relative size-36">
        <div
          [class]="
            'rounded-full size-full bg-' +
            getFirstSlotOrDefaultType() +
            ' opacity-55 absolute top-0 left-0 z-1'
          "
        ></div>
        <img
          [ngSrc]="pokemon.spriteUrl"
          [alt]="'pokemon sprite ' + pokemon.name"
          fill="true"
          priority="false"
          class="z-2"
        />
      </div>

      <div uiCardFooter class="flex gap-2">
        @if(pokemon.types.length){ @for(type of pokemon.types; track $index){
        <div uiPokemonTypeTag [variant]="type.name" class="">
          {{ type.name }}
        </div>
        } } @else{
        <div uiPokemonTypeTag variant="normal" uiSkeleton>???</div>
        }
      </div>
    </div>
  `,
  styles: ``,
  imports: [
    RouterLink,
    PadLeftPipe,
    PokemonTypeTagDirective,
    SkeletonDirective,
    NgOptimizedImage,
    CardDirectives,
    TitleCasePipe
  ],
})
export class PokemonListItemComponent {
  @Input() pokemon!: PokemonListItem; 

  getFirstSlotOrDefaultType(): string {
    return this.pokemon.types.length ? this.pokemon.types[0].name : 'normal';
  }
}
