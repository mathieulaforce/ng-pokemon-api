import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonOverviewComponent } from "../../features/pokemon/pokemon-overview/pokemon-overview.component";
import { PokemonSharedService } from '../../pokemon-shared.service';
import { LoadingSpinnerComponent } from "../../features/ui/loading-spinner/loading-spinner.component";
import { PokemonDetailComponent } from "../../features/pokemon/pokemon-detail/pokemon-detail.component";

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
  constructor(private pokemonSharedService:PokemonSharedService) {
   }
  ngOnInit(): void {
    this.pokemonSharedService.loadData();
    this.pokemonSharedService.loadingData.subscribe(isLoading => {
      this.isLoading = isLoading;
      
    });
  }

  ngOnDestroy(): void {
    this.pokemonSharedService.loadingData.unsubscribe(); 
   }
}
