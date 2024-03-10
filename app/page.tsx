"use client";

import { useEffect, useState } from "react";
import { usePokemonList } from "./_hooks/usePokemonList";
import { Pokemon } from "./_types/global";
import { useSearchPokemonByName } from "./_hooks/useSearchPokemonByName";
import { InputSearch } from "./_components/InputSearch";
import { PokemonList } from "./_components/PokemonList";

export default function Home() {
  const [term, setTerm] = useState<string>("");
  const [debouncedTerm, setDebouncedTerm] = useState<string>("");
  const [pokemonContent, setPokemonContent] = useState<Pokemon[]>([]);

  const { pokemons, error: errorList } = usePokemonList({
    limit: 10,
    offset: 0,
  });

  const { pokemon, error: pokemonError } =
    useSearchPokemonByName(debouncedTerm);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 800);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    if (debouncedTerm.length === 0) {
      setPokemonContent(pokemons as Pokemon[]);
    } else {
      setPokemonContent([pokemon]);
    }
  }, [debouncedTerm, pokemons, pokemon]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  return (
    <div className="py-4 px-10 md:px-48 :py-8">
      <div>
        <InputSearch
          value={term}
          onChange={handleOnChange}
          placeholder="Search for a Pokémon"
        />

        {errorList && pokemonError && (
          <h1 className="text-orange-500 font-extrabold text-5xl mt-10">
            Error fetching the list of pokemons
          </h1>
        )}

        <div className="p-4 mt-4 max-h-[600px] overflow-y-auto box-border shadow-xl rounded-lg">
          <PokemonList
            pokemons={pokemonContent as Pokemon[]}
            limit={10}
            offset={0}
            hasMore={true}
            hasASearchTerm={debouncedTerm.length > 0}
          />
        </div>
      </div>
    </div>
  );
}
