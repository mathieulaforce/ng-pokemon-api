import { Component, OnDestroy, OnInit } from '@angular/core'; 
import {
  PokemonListItem,
  PokemonSharedService,
} from '../../pokemon/pokemon-shared.service';
import { LoadingSpinnerComponent } from '../../ui/loading-spinner/loading-spinner.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { PokemonDialogComponent } from '../pokemon-dialog/pokemon-dialog.component';
import { Subscription } from 'rxjs';
import { PokemonModule } from '../../pokemon/pokemon.module';
import { PaperDirective } from '../../ui/paper.directive';
@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  template: `
    @if(!isLoading && pokemons.length){
    <div uiPaper
      class="gap-6 items-center justify-center grid 
        grid-cols-1
        sm:grid-cols-[repeat(2,minmax(200px,200px))]
         md:grid-cols-[repeat(3,minmax(200px,251px))]
        xl:grid-cols-[repeat(4,minmax(200px,251px))] 
        2xl:grid-cols-[repeat(6,minmax(200px,251px))] 
       "
    >
      @for(pokemon of pokemons; track pokemon.id){
      <app-pokemon-card
        [pokemon]="pokemon"
        (click)="openDetails(pokemon)"
      ></app-pokemon-card>
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
  imports: [LoadingSpinnerComponent, DialogModule, PokemonModule, PaperDirective],
})
export class PokemonListComponent implements OnInit, OnDestroy {
  public pokemons: PokemonListItem[] = [];
  public isLoading: boolean = true;
  private subscriptions: Subscription[] = [];

  constructor(
    private pokemonSharedService: PokemonSharedService,
    public dialog: Dialog
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe()); 
  }

  openDetails(pokemon: PokemonListItem) { 
    this.dialog.open(PokemonDialogComponent, {
     data:{ pokemonId: pokemon.id,}
    });
  }

  ngOnInit(): void {
    this.subscriptions =  [
    this.pokemonSharedService.pokemonListToDisplay.subscribe((pokemons) => {
      this.pokemons = pokemons;
    }),
    this.pokemonSharedService.loadingData.subscribe((isLoading) => {
      this.isLoading = isLoading;
    })]
  }
}
