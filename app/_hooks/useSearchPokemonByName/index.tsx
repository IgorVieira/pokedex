import { useQuery } from "@tanstack/react-query";
import { FastAverageColor } from "fast-average-color";
import axios from "axios";

export const fetchPokemon = async (searchTerm: string) => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
  );

  const fac = new FastAverageColor();

  const color = await fac.getColorAsync(data.sprites.front_default);

  data.color = color.hex;

  return data;
};

export const useSearchPokemonByName = (searchTerm: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["pokemon", searchTerm],
    queryFn: async () => fetchPokemon(searchTerm),
  });

  return { pokemon: data, error, isLoading };
};
