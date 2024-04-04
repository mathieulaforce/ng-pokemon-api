import { Component, OnDestroy, OnInit } from '@angular/core';
import { UiModule } from '../../ui/ui.module';
import {
  PokemonListItem,
  PokemonSharedService,
} from '../../pokemon/pokemon-shared.service';
import { Subscription } from 'rxjs';
import { PokemonCardComponent } from '../../pokemon/components/pokemon-card.component';
import { PokemonFilterComponent } from '../../pokemon/components/pokemon-filter/pokemon-filter.component'; 
import {DragDropModule} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-pokemon-chooser',
  standalone: true,
  template: `
    <div
      uiPaper
      class="flex flex-col gap-6 w-fit h-[calc(100vh-3.5rem-3rem)] overflow-auto"
    >
    <app-pokemon-filter></app-pokemon-filter>

      @for (pokemon of pokemons; track pokemon.id) {

      <app-pokemon-card cdkDrag
        [pokemon]="pokemon"
        [density]="'condensed'"
      ></app-pokemon-card>
      }
    </div>
  `,
  styles: ``,
  imports: [UiModule, PokemonCardComponent, PokemonFilterComponent, DragDropModule],
})
export class PokemonChooserComponent implements OnDestroy, OnInit {
  private subscriptions: Subscription[] = [];
  pokemons: PokemonListItem[] = [];
  constructor(private pokemonService: PokemonSharedService) {}
  ngOnInit(): void {
    this.subscriptions.push(
      this.pokemonService.pokemonListToDisplay.subscribe((pokemonList) => {
        this.pokemons = pokemonList;
      })
    );
  }
  ngOnDestroy(): void {}
}
