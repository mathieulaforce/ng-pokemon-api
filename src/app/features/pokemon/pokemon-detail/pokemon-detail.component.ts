import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import {
  PokemonListItem,
  PokemonSharedService,
} from '../../../pokemon-shared.service';
import { PokemonTypeTagDirective } from '../../ui/pokemon-type-tag.directive';
import { PadLeftPipe } from '../../../pad-left.pipe'; 
import { SvgIconComponent } from '../../ui/icons/svg-icon/svg-icon.component';
import { Subscription } from 'rxjs';
import { PokemonHeaderComponent } from './pokemon-header.component';
import { PokemonPortraitComponent } from './pokemon-portrait.component';
import { PokemonMeasurementsComponent } from './pokemon-measurements.component';
import { PokemonStatsComponent } from './pokemon-stats.component';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  template: `
  @if (pokemon === undefined) {

  }
  @else if (pokemon === null) {
    <div class="gap-4 bg-card rounded-xl size-64">Pokemon Not found</div>
    }
    @else {
    <div class="grid grid-cols-[16rem_1fr] gap-4 bg-card rounded-xl">
      <app-pokemon-portrait [pokemon]="pokemon" class="size-full"></app-pokemon-portrait>
      <div class="p-4 flex flex-col gap-4">
        <app-pokemon-header [pokemon]="pokemon"></app-pokemon-header>
        <app-pokemon-measurements [pokemon]="pokemon"></app-pokemon-measurements>

        @if(pokemon.details?.stats?.length ??0 > 0){ 
          <app-pokemon-stats [pokemon]="pokemon"></app-pokemon-stats>        
        }
      </div>
    </div>
    } `,
  styles: ` 
  `,
  imports: [
    PokemonTypeTagDirective,
    PadLeftPipe,
    TitleCasePipe,
    SvgIconComponent,
    PokemonHeaderComponent,
    PokemonPortraitComponent,
    PokemonMeasurementsComponent,
    PokemonStatsComponent
  ],
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  @Input() id: number = -1;

  public pokemon: PokemonListItem | null = null;
  public isLoading = true;

  private supscriptions: ( Subscription | undefined)[] = [] ;

  constructor(private pokemonSharedService: PokemonSharedService) {}
  ngOnDestroy(): void {
     this.supscriptions.forEach((sub) => {
      sub?.unsubscribe();
     });
  }

  ngOnInit(): void {
    this.supscriptions.push(this.pokemonSharedService.getPokemonById(this.id)?.subscribe((pokemon) => {
      this.pokemon = pokemon;
    }));

    this.supscriptions.push(this.pokemonSharedService.loadingDetailsPokemon.subscribe((isLoading) => {
      this.isLoading = isLoading;
    }));
  }
}
