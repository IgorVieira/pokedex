import { Pokemon } from "@/app/_types/global";
import { LoadMore } from "../LoadMore";
import { PokemonCard } from "../PockemonCard";

type PokemonListProps = {
  pokemons: Pokemon[];
  limit: number;
  offset: number;
  hasMore: boolean;
};

export const PokemonList = ({
  pokemons,
  hasASearchTerm,
  ...paginationProps
}: PokemonListProps & {
  hasASearchTerm?: boolean;
}) => {
  return (
    <div>
      {pokemons?.map((pokemon) => {
        return (
          <div key={pokemon?.id}>
            <PokemonCard {...pokemon} />
          </div>
        );
      })}
      {!hasASearchTerm && (
        <LoadMore data-testid="load-more" {...paginationProps} />
      )}
    </div>
  );
};
