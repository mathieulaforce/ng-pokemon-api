import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './components/pokemon-card.component';
 
@NgModule({
  declarations: [],
  imports: [
    PokemonCardComponent,    
  ],
  exports: [
    PokemonCardComponent
  ]
})
export class PokemonModule { }
