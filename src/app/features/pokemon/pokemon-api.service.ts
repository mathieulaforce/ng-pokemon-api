import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, from } from 'rxjs';
import { concatAll, map, mergeMap } from 'rxjs/operators';

export interface Pagination<T> {
  currentPage: number;
  limit: number;
  totalPages: number;
  results: T[];
}

interface PokemonApiGetListResponse {
  count: number;
  next: string;
  previous: string;
  results: NameUrl[];
}

interface NameUrl {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  defaultSpriteUrl: string;

  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}

export interface PokemonDetail {
  base_experience: number;
  height: number;
  id: number;
  name: string;
  order: number;
  species: NameUrl;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface PokemonGetDetailResponse {
  base_experience: number;
  cries: Cries;
  forms: NameUrl[];
  height: number;
  id: number;
  name: string;
  order: number;
  species: NameUrl;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface Sprites {
  back_default: string;
  back_female: any;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
  other: Other;
}

export interface Other {
  dream_world: DreamWorld;
}

export interface DreamWorld {
  front_default: string;
  front_female: any;
}

export interface Home {
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: NameUrl;
}

export interface Type {
  slot: number;
  type: NameUrl;
}

export interface PokemonTypeGetResponse {
  damage_relations: {
    double_damage_from: NameUrl[];
    double_damage_to: NameUrl[];
    half_damage_from: NameUrl[];
    half_damage_to: NameUrl[];
    no_damage_from: NameUrl[];
    no_damage_to: NameUrl[];
  };
  id: number;
  name: string;
  pokemon: {
    pokemon: NameUrl;
    slot: number;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/';
  private readonly baseUrlSprite =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/';

  constructor(private httpClient: HttpClient) {}

  public fetchPokemons(offset: number, limit: number) {
    return this.httpClient
      .get<PokemonApiGetListResponse>(
        `${this.baseUrl}pokemon?limit=${limit}&offset=${offset}`
      )
      .pipe(
        map((response) => {
          const pokemons = response.results.map((pokemon, index) => {
            const id = offset + index + 1;
            return {
              id: id,
              name: pokemon.name,
              spriteUrl: this.getPokemonSpriteUrl(id),
            };
          });
          return pokemons;
        })
      );
  }

  public fetchPokemonById(id: number): Observable<PokemonDetail> {
    return this.httpClient
      .get<PokemonGetDetailResponse>(`${this.baseUrl}pokemon/${id}`)
      .pipe(
        map((pokemon) => {
          return {
            id: pokemon.id,
            base_experience: pokemon.base_experience,
            height: pokemon.height,
            name: pokemon.name,
            order: pokemon.order,
            species: pokemon.species,
            stats: pokemon.stats,
            types: pokemon.types,
            weight: pokemon.weight,
          };
        })
      );
  }

  public fetchTypes() {
    return this.httpClient
      .get<PokemonApiGetListResponse>(`${this.baseUrl}type?limit=${100}`)
      .pipe(
        map((response) => {
          const types = response.results.map((type, index) => {
            const id = index + 1;
            return {
              id: id,
              name: type.name,
              url: type.url,
            };
          });
          return types;
        })
      )
      .pipe(
        mergeMap((types) => {
          const observables = types.map((type) =>
            this.httpClient.get<PokemonTypeGetResponse>(type.url)
          );
          return forkJoin(observables);
        })
      );
  }

  private getPokemonSpriteUrl(id: number) {
    return new URL(`${id}.svg`, this.baseUrlSprite).href;
  }
}
