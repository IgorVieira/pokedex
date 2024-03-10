"use client";

import { useState } from "react";

import { Pokemon } from "../../_types/global";
import useInfiniteScroll from "../../_hooks/useInfiniteScroll";
import { PokemonCard } from "../PockemonCard";
import { PokemonCardSkeleton } from "../PokemonCardSkeleton";
import { fetchPokemonArray } from "../../_hooks/usePokemonList";

type LoadMoreProps = {
  limit: number;
  offset: number;
  hasMore: boolean;
};

export const LoadMore = ({ hasMore, limit, offset }: LoadMoreProps) => {
  const [data, setData] = useState({
    pokemons: [] as Pokemon[],
    limit,
    offset,
    hasMore,
  });

  const loadMore = async () => {
    if (!data.hasMore) return;

    const newOffset = data.offset + data.limit;
    const response = await fetchPokemonArray(data.limit, newOffset);

    setData({
      pokemons: [...data.pokemons, ...response] as Pokemon[],
      limit: data.limit,
      offset: newOffset,
      hasMore: response.length === data.limit,
    });
  };

  const { moreRef } = useInfiniteScroll(loadMore);

  return (
    <>
      {data.pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}

      {data.hasMore && (
        <>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <PokemonCardSkeleton key={index} />
            ))}

          <div ref={moreRef} />
        </>
      )}
    </>
  );
};
