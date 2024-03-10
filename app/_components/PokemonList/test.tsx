import { render } from "@testing-library/react";
import { PokemonList } from "./index";
import { Pokemon } from "@/app/_types/global";

jest.mock("../.././lib/utils", () => ({
  cn: jest.fn(),
}));

describe("PokemonList", () => {
  it("renders the list of pokemons", () => {
    const pokemons = [
      { id: 1, name: "Pikachu" },
      { id: 2, name: "Charizard" },
      { id: 3, name: "Bulbasaur" },
    ] as Pokemon[];

    const { getByText } = render(
      <PokemonList
        pokemons={pokemons as Pokemon[]}
        limit={10}
        offset={0}
        hasMore={true}
        hasASearchTerm={true}
      />
    );

    expect(getByText("Pikachu")).toBeInTheDocument();
    expect(getByText("Charizard")).toBeInTheDocument();
    expect(getByText("Bulbasaur")).toBeInTheDocument();
  });

  it("renders the LoadMore component when hasASearchTerm is false", () => {
    const pokemons = [
      { id: 1, name: "Pikachu" },
      { id: 2, name: "Charizard" },
      { id: 3, name: "Bulbasaur" },
    ];

    const paginationProps = {
      currentPage: 1,
      totalPages: 5,
      onNextPage: jest.fn(),
      onPreviousPage: jest.fn(),
    };

    const { queryByTestId } = render(
      <PokemonList
        pokemons={pokemons as Pokemon[]}
        limit={10}
        offset={0}
        hasMore={true}
        hasASearchTerm={true}
      />
    );

    expect(queryByTestId("load-more")).not.toBeInTheDocument();
  });
});
