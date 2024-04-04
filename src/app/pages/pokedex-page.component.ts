import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonOverviewComponent } from "../features/pokedex/pokemon-overview/pokemon-overview.component";
import { PokemonSharedService } from '../features/pokemon/pokemon-shared.service';
import { LoadingSpinnerComponent } from "../features/ui/loading-spinner/loading-spinner.component";
import { PokemonDetailComponent } from "../features/pokedex/pokemon-detail/pokemon-detail.component";
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-pokedex-page',
    standalone: true,
    template: `
    @if(isLoading){ 
      <ui-loading-spinner></ui-loading-spinner>
    }@else { 
      <app-pokemon-overview></app-pokemon-overview>
    } 
  `,
    styles: ``,
    imports: [PokemonOverviewComponent, LoadingSpinnerComponent, PokemonDetailComponent]
})
export class PokedexPageComponent implements OnInit, OnDestroy{
  isLoading: boolean = true;
  private loadingDataSubscription: Subscription = new Subscription();
  constructor(private pokemonSharedService:PokemonSharedService) {
   }
  ngOnInit(): void { 
    this.pokemonSharedService.loadData();
    this.pokemonSharedService.resetFilter();
    this.loadingDataSubscription = this.pokemonSharedService.loadingData.subscribe(isLoading => {
      this.isLoading = isLoading;
      
    });
  }

  ngOnDestroy(): void {
    this.loadingDataSubscription.unsubscribe(); 
   }
}
