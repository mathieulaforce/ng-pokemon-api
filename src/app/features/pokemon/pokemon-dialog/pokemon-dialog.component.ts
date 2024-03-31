import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, Input } from '@angular/core';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
  
@Component({
  selector: 'app-pokemon-dialog',
  standalone: true,
  imports: [PokemonDetailComponent],
  template: `
    <div class="max-w-3xl" >
      <app-pokemon-detail [id]="data.pokemonId"></app-pokemon-detail>
    </div>
  `,
  styles: ``
})
export class PokemonDialogComponent {
  @Input() pokemonId: number = -1;  
  constructor( @Inject(DIALOG_DATA) public data: {pokemonId: number} , public dialogRef: DialogRef,) {}
}
