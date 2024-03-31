import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonListItemComponent } from '../pokemon-list-item/pokemon-list-item.component';
import {
  PokemonListItem,
  PokemonSharedService,
} from '../../../pokemon-shared.service';
import { LoadingSpinnerComponent } from '../../ui/loading-spinner/loading-spinner.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { PokemonDialogComponent } from '../pokemon-dialog/pokemon-dialog.component';
@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  template: `
    @if(!isLoading && pokemons.length){
    <div
      class="gap-6 items-center justify-center grid 
        grid-cols-1
        sm:grid-cols-[repeat(2,minmax(200px,200px))]
         md:grid-cols-[repeat(3,minmax(200px,251px))]
        xl:grid-cols-[repeat(4,minmax(200px,251px))] 
        2xl:grid-cols-[repeat(6,minmax(200px,251px))] 
        bg-white rounded-md 
        p-2
        sm:p-6"
    >
      @for(pokemon of pokemons; track pokemon.id){
      <app-pokemon-list-item
        [pokemon]="pokemon"
        (click)="openDetails(pokemon)"
      ></app-pokemon-list-item>
      }
    </div>
    }@else if (isLoading) {
    <ui-loading-spinner />
    }@else {
    <div class="flex flex-col gap-6 justify-center items-center h-96">
      <img src="assets/pokeball.svg" alt="pokeball" class="w-32 h-32" />
      <div class="text-2xl text-background font-bold">No pokémons found</div>
    </div>
    }
  `,
  styles: ``,
  imports: [PokemonListItemComponent, LoadingSpinnerComponent, DialogModule],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  public pokemons: PokemonListItem[] = [];
  public isLoading: boolean = true;

  constructor(
    private pokemonSharedService: PokemonSharedService,
    public dialog: Dialog
  ) {}
  ngOnDestroy(): void {
    this.pokemonSharedService.loadingData.unsubscribe();
    this.pokemonSharedService.pokemonListToDisplay.unsubscribe();
  }

  openDetails(pokemon: PokemonListItem) { 
    this.dialog.open(PokemonDialogComponent, {
     data:{ pokemonId: pokemon.id,}
    });
  }

  ngOnInit(): void {
    this.pokemonSharedService.pokemonListToDisplay.subscribe((pokemons) => {
      this.pokemons = pokemons;
    });
    this.pokemonSharedService.loadingData.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
