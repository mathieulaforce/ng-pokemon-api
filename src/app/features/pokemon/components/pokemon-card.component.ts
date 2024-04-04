import { ChangeDetectionStrategy, Component, Input } from '@angular/core'; 
import { PadLeftPipe } from '../../../pad-left.pipe';
import { PokemonListItem } from '../../pokemon/pokemon-shared.service'; 
import { CommonModule, NgOptimizedImage, TitleCasePipe } from '@angular/common'
import { UiModule } from '../../ui/ui.module';
 
@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      uiCard
      [ngClass]="{'cursor-pointer md:hover:scale-105 hover:shadow-lg transition-all duration-500 ease-in-out ': true,
      'p-2 gap-2': isCondensed()}"       
    >
      <div uiCardHeader [ngClass]="{'text-center': true, 'p-2 gap-0  !space-y-0' : isCondensed()}">
        <div uiCardDescription>
          No. {{ pokemon.id | padLeft : '0' : 3 }}
        </div>
        <div  uiCardTitle class="font-medium text-xl">{{ pokemon.name | titlecase }}</div>
      </div>
      <div uiCardContent [ngClass]="{'relative': true, 'size-36': !isCondensed(), 'size-28': isCondensed()} ">
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

      <div uiCardFooter class="flex gap-2 p-2">
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
    PadLeftPipe, 
    NgOptimizedImage,
    UiModule,
    TitleCasePipe,
    CommonModule
  ],
})
export class PokemonCardComponent {
  @Input() pokemon!: PokemonListItem; 
  @Input() density: "condensed" | "normal" = "normal"; 

  public isCondensed(): boolean {
    return this.density === 'condensed';
  }

  getFirstSlotOrDefaultType(): string {
    return this.pokemon.types.length ? this.pokemon.types[0].name : 'normal';
  }
}
