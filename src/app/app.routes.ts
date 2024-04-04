import { Routes } from '@angular/router';
import { PokedexPageComponent } from './pages/pokedex-page.component';
import { YourTeamPageComponent } from './pages/your-team-page.component';

export const routes: Routes = [
    {
        path: '',
        component: PokedexPageComponent
    }, 
    {
        path: 'pokedex',
        component: PokedexPageComponent
    }, 
    {
        path: 'yourTeam',
        component: YourTeamPageComponent
    }, 
];
