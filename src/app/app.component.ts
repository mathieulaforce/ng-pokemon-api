import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PokemonOverviewComponent } from './features/pokedex/pokemon-overview/pokemon-overview.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8">
      <div class="flex flex-col gap-6">
        <header
          class="sticky top-0 z-50 w-full border-b border-border/40 bg-pokedexRed/95 backdrop-blur supports-[backdrop-filter]:bg-pokedexRed/60"
        >
          <div class="container flex h-14 max-w-screen-2xl items-center">
            <div class="mr-4 hidden md:flex">
           
              <nav class="flex items-center gap-4  lg:gap-6 text-lg text-white/60 ">
                <a
                  class="transition-colors hover:text-white/80 "
                  [routerLink]="['/']"
                  routerLinkActive="!text-white/100"
                  [routerLinkActiveOptions]="{exact: true}"
                  >pokédex</a>
                  <a
                  class="transition-colors hover:text-white/80 text-white/60"
                  [routerLink]="['/yourTeam']"
                  routerLinkActive="!text-white/100"
                  >Your team</a>
                 
              </nav>
            </div> 
          </div>
        </header>
        <div>
          <router-outlet />
        </div>
      </div>
    </div>
  `,
  styles: [],
  imports: [RouterOutlet, RouterLink,RouterLinkActive, PokemonOverviewComponent, FormsModule],
})
export class AppComponent {
  title = 'pokemon';
}
