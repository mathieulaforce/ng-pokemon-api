import { Component } from '@angular/core';
import { PokemonChooserComponent } from '../features/yourTeam/pokemon-chooser/pokemon-chooser.component';
import { PokemonSharedService } from '../features/pokemon/pokemon-shared.service';
import { LoadingSpinnerComponent } from '../features/ui/loading-spinner/loading-spinner.component';
import { Subscription } from 'rxjs';
import { PokemonTeamComponent } from '../features/yourTeam/pokemon-team/pokemon-team.component';

@Component({
  selector: 'app-your-team-page',
  standalone: true,
  template: `
    @if(isLoading){
    <ui-loading-spinner></ui-loading-spinner>
    }@else {
    <div class="flex flex-row gap-6">
      <app-pokemon-chooser></app-pokemon-chooser>
      <app-pokemon-team></app-pokemon-team>
    </div>
    }
  `,
  styles: ``,
  imports: [
    PokemonChooserComponent,
    LoadingSpinnerComponent,
    PokemonTeamComponent,
  ],
})
export class YourTeamPageComponent {
  isLoading: boolean = true;
  private loadingDataSubscription: Subscription = new Subscription();
  constructor(private pokemonSharedService: PokemonSharedService) {}
  ngOnInit(): void {
    this.pokemonSharedService.loadData();
    this.pokemonSharedService.resetFilter();
    this.loadingDataSubscription =
      this.pokemonSharedService.loadingData.subscribe((isLoading) => {
        this.isLoading = isLoading;
      });
  }

  ngOnDestroy(): void {
    this.loadingDataSubscription.unsubscribe();
  }
}
