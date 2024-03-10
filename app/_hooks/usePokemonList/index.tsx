import { useQuery } from "@tanstack/react-query";
import { FastAverageColor } from "fast-average-color";
import axios from "axios";

export interface PokemonType {
  slot: string;
  type: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  image: {
    sprites: string;
  };
  types: PokemonType[];
  color?: string;
}

export interface PokemonData {
  name: string;
  color?: string;
}

const fetchPokemon = async (name: string) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return res.data;
};

export const fetchPokemonArray = async (
  limit: number,
  offset: number
): Promise<PokemonData[]> => {
  const pokemonArray: PokemonData[] = [];
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );

    const { results } = res.data;

    const fac = new FastAverageColor();

    for (const pokemon of results) {
      const pokemonData = await fetchPokemon(pokemon.name);
      const color = await fac.getColorAsync(pokemonData.sprites.front_default);

      pokemonArray.push({
        ...pokemonData,
        color: color.hex,
      });
    }

    return pokemonArray;
  } catch (error) {
    throw error;
  }
};

interface PokemonListHookResult {
  pokemons: PokemonData[] | undefined;
  error: any;
  isLoading: boolean;
}

interface PokemonListParams {
  limit?: number;
  offset?: number;
}

export const usePokemonList = ({
  limit = 30,
  offset = 0,
}: PokemonListParams = {}): PokemonListHookResult => {
  const {
    data: pokemons,
    error,
    isLoading,
  } = useQuery<any[]>({
    queryKey: ["pokemon-list"],
    queryFn: () => fetchPokemonArray(limit, offset),
  });

  return { pokemons, error, isLoading };
};
