import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { provideIcons, NgIconComponent } from '@ng-icons/core';
import { faSolidMagnifyingGlass } from '@ng-icons/font-awesome/solid';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import {
  PokemonFilter,
  PokemonSharedService,
} from '../../../pokemon-shared.service';
import { PokemonTypefilterMenuComponent } from './pokemon-typefilter-menu.component';
import { InputDirective } from '../../ui/input.directive';

@Component({
  selector: 'app-pokemon-filter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-row gap-4">
      <div class="relative w-80">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <ng-icon
            name="faSolidMagnifyingGlass"
            class="w-4 h-4 text-muted-foreground"
          ></ng-icon>
        </div>
        <input
          type="search"
          [(ngModel)]="searchTerm"
          (input)="search()"
          uiInput
          placeholder="Search by name or number"
          required
          class="ps-10"
        />
      </div>

      <div>
        <app-pokemon-typefilter-menu [pokemonTypes]="availlableTypes" [selectedTypes]="selectedTypes" (selectedTypesChange)="onTypesSelected($event)"></app-pokemon-typefilter-menu>
      </div>
    </div>
  `,
  styles: ``,
  viewProviders: [provideIcons({ faSolidMagnifyingGlass })],
  imports: [FormsModule, NgIconComponent, PokemonTypefilterMenuComponent, InputDirective],
})
export class PokemonFilterComponent implements OnInit, OnDestroy {
  public searchTerm = '';
  public availlableTypes: string[] = [];
  public selectedTypes: string[] = [];
  private filterSubject = new Subject<PokemonFilter>();

  constructor(private pokemonSharedService: PokemonSharedService) {}
  ngOnDestroy(): void {
    this.filterSubject.complete();
  }
  ngOnInit(): void {
    this.filterSubject
      .pipe(debounceTime(100), distinctUntilChanged())
      .subscribe((filter) => {
        this.pokemonSharedService.filterPokemons(filter);
      });

    this.pokemonSharedService.availlableTypes.subscribe((types) => {
      this.availlableTypes = types;
    });
  }

  public onTypesSelected(types: string[]) {
    this.selectedTypes = types;
    this.filterSubject.next({
      searchText: this.searchTerm,
      types:  this.selectedTypes,
    });
  }

  public search() {
    this.filterSubject.next({
      searchText: this.searchTerm,
      types:  this.selectedTypes,
    });
  }
}
