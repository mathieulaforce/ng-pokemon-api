import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import {
  CdkMenuItemRadio,
  CdkMenuItemCheckbox,
  CdkMenuGroup,
  CdkMenu,
  CdkMenuTrigger,
  CdkMenuItem,
  CdkMenuBar,
} from '@angular/cdk/menu'; 
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidXmark } from '@ng-icons/font-awesome/solid'; 
import { UiModule } from '../../../ui/ui.module';
@Component({
  selector: 'app-pokemon-typefilter-menu',
  standalone: true,
  viewProviders:  [provideIcons({ faSolidXmark })],
  imports: [
    CdkMenuBar,
    CdkMenuItem,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuGroup,
    CdkMenuItemCheckbox,
    CdkMenuItemRadio, 
    NgIconComponent, 
    UiModule
  ],
  template: `
    <div class="">
      <button
        [cdkMenuTriggerFor]="filterMenu"
        class="bg-primary text-primary-foreground shadow-md h-10 py-2 px-4 hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
      >  
        <span>Type</span>
      </button>
    </div>
    <ng-template #filterMenu>
      <div
        cdkMenu
        class="grid grid-cols-2 gap-2 p-4 rounded-sm mt-2 bg-card select-none border border-pokedexRed max-h-44 overflow-auto"
      >
      <input
          type="search" 
          class="col-span-2"
          uiInput
          placeholder="Filter type"
          (input)="onFilterChange($event.target)"
        />
        @for (type of filteredTypes; track type) {
        <label>
          <div
            uiPokemonTypeTag
            [variant]="type"
            class="flex flew-row gap-2 cursor-pointer opacity-90 hover:opacity-100 transition-opacity duration-100 items-center ps-3"
          >
            <input
              type="checkbox"
              [checked]="selectedTypes.includes(type)"
              (change)="onTypeChange(type)"
              class="w-4 h-4 text-pokedexRed bg-card-100 border-border rounded-full focus:ring-pokedexRed "
            />
            <span> {{ type }} </span>
          </div>
        </label>
        }
        <button 
        (click)="clearFilter()"
        class="col-span-2 gap-2 bg-pokedexRed opacity-80 hover:opacity-100 transition-opacity duration-100 text-white font-bold py-2 px-4 inline-flex items-center justify-center rounded-md">
        <ng-icon
            name="faSolidXmark"
            class="w-4 h-4"
          ></ng-icon>
       <span> Clear filter</span></button>
      </div>
    </ng-template>
  `,
  styles: ``,
})
export class PokemonTypefilterMenuComponent implements OnInit{
  
  @Input() pokemonTypes: string[] = [];
  @Input() selectedTypes: string[] = [];
  @Output() selectedTypesChange = new EventEmitter<string[]>();

  protected filteredTypes: string[] = [];

  ngOnInit(): void {
    this.filteredTypes = this.pokemonTypes;
  }


  public onTypeChange(type: string): void {
    if (this.selectedTypes.find((t) => t === type) === undefined) {
      this.selectedTypes = [...this.selectedTypes, type];
    } else {
      this.selectedTypes = this.selectedTypes.filter((t) => t !== type);
    }
    this.selectedTypesChange.emit(this.selectedTypes);
  }

  public onFilterChange(target: EventTarget | null): void {
    const inputElement = target as HTMLInputElement;    
    this.filteredTypes = this.pokemonTypes.filter((type) => type.toLowerCase().includes(inputElement.value.toLowerCase()));
  }

  public clearFilter(): void {
    this.selectedTypes = [];
    this.selectedTypesChange.emit(this.selectedTypes);
  }
}
