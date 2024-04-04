import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {
  Pokemon,
  PokemonApiService,
  PokemonDetail,
} from './pokemon-api.service';

export interface PokemonListItem {
  id: number;
  name: string;
  spriteUrl: string;
  types: {
    slot: number;
    name: string;
  }[];
  details?: PokemonDetail;
}

export interface PokemonFilter {
  searchText?: string;
  types?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonSharedService {
  private readonly MAX_POKEMON_WITH_DREAM_WORLD_SPRITE = 649;
  private pokemonList = new BehaviorSubject<PokemonListItem[]>([]);

  public pokemonListToDisplay = new BehaviorSubject<PokemonListItem[]>([]);
  public availlableTypes = new BehaviorSubject<string[]>([]);
  public loadingData = new BehaviorSubject<boolean>(true);
  public loadingDetailsPokemon = new BehaviorSubject<boolean>(true);

  constructor(private apiService: PokemonApiService) {}

  public loadData() { 
    if (this.pokemonList.value.length === 0) {
      this.loadingData.next(true);
      const limit = 100;
      let offset = 0;
      this.fetchAllPokemons(offset, limit);
      this.resetFilter();
      this.apiService.fetchTypes();      
    }
  }

  public resetFilter() {
    this.pokemonListToDisplay.next(this.pokemonList.value);
  }

  public filterPokemons(filter: PokemonFilter) {
    let filteredPokemons = this.pokemonList.value;
    if (filter.searchText) {
      const searchText = filter.searchText.toLowerCase();
      filteredPokemons = filteredPokemons.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(searchText) ||
          pokemon.id === +searchText
      );
    }

    if (filter.types && filter.types.length > 0) {
      const types = filter.types;
      filteredPokemons = filteredPokemons.filter((pokemon) =>
        types.every((type) => pokemon.types.map(t=>t.name).includes(type))
      );
    }

    this.pokemonListToDisplay.next(filteredPokemons);
  }

  public getPokemonById(id: number): Observable<PokemonListItem> | null {
    this.loadingDetailsPokemon.next(true);
    const pokemon = this.pokemonList.value.find((pokemon) => pokemon.id === id);
    if (!pokemon) {
      this.loadingDetailsPokemon.next(false);
      return null;
    }

    if (!pokemon.details) {
      return this.apiService.fetchPokemonById(id).pipe(
        map((details) => {
          this.loadingDetailsPokemon.next(false);
          pokemon.details = details;
          return pokemon;
        })
      );
    }

    return new Observable((observer) => {
      observer.next(pokemon);
      this.loadingDetailsPokemon.next(false);
      observer.complete();
    });
  }

  private fetchAllPokemons(offset: number, limit: number) {
    limit =
      offset + limit > this.MAX_POKEMON_WITH_DREAM_WORLD_SPRITE
        ? this.MAX_POKEMON_WITH_DREAM_WORLD_SPRITE - offset
        : limit;

    this.apiService
      .fetchPokemons(offset, limit)
      .pipe(
        map((pokemons) =>
          pokemons.map((pokemon) => ({ ...pokemon, types: [] }))
        )
      )
      .subscribe((result) => {
        this.pokemonList.next(this.pokemonList.value.concat(result));
        this.pokemonListToDisplay.next(this.pokemonList.value);
        if (this.canLoadMorePokemons(offset, limit)) {
          this.fetchAllPokemons(offset + limit, limit);
        } else {
          this.fetchTypes();
        }
      });
  }

  private fetchTypes() {
    this.apiService.fetchTypes().subscribe((result) => {
      const types: string[] = [];
      result.forEach((type) => {
        types.push(type.name);
        type.pokemon.forEach((pokemon) => {
          const pokemonItem = this.pokemonList.value.find(
            (p) => p.name === pokemon.pokemon.name
          );
          if (pokemonItem) {
            pokemonItem.types.push({ slot: pokemon.slot, name: type.name });
            pokemonItem.types.sort((a, b) => a.slot - b.slot);
          }
        });
      });

      this.availlableTypes.next(types);
      this.loadingData.next(false);
    });
  }

  private canLoadMorePokemons(offset: number, limit: number) {
    return offset + limit < this.MAX_POKEMON_WITH_DREAM_WORLD_SPRITE;
  }
}
