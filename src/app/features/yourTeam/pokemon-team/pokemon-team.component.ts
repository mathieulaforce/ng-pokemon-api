import { Component } from '@angular/core';
import { UiModule } from '../../ui/ui.module';

@Component({
  selector: 'app-pokemon-team',
  standalone: true,
  imports: [UiModule],
  template: `
   <div class="flex flex-wrap gap-2">
   @for (item of items; track $index) { 
      <div uiCard class="bg-dark">pokemon-team works!</div>
    }
   </div>
  `,
  styles: ``,
})
export class PokemonTeamComponent {
  public items: number[] = [1,2,3,4,5,6];
  constructor() {}
}
