import { getByTestId, render, screen } from "@testing-library/react";
import { PokemonCard } from ".";

describe("PockemonCard", () => {
  it("renders the pokemon, name and type", () => {
    const { getByText } = render(
      <PokemonCard
        id={1}
        name="bulbasaur"
        sprites={{
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        }}
        types={[{ slot: 1, type: { name: "grass" } }]}
        color="#f0f0f0"
      />
    );

    expect(getByText("bulbasaur")).toBeInTheDocument();
    expect(getByText("grass")).toBeInTheDocument();
  });

  it("renders the pokemon, name and type", () => {
    const { getByText, getByTestId } = render(
      <PokemonCard
        id={2}
        name="ivysaur"
        sprites={{
          front_default: "",
        }}
        types={[{ slot: 1, type: { name: "poison" } }]}
        color="#f0f0f0"
      />
    );

    expect(getByTestId("pokemon-card-initials")).toBeInTheDocument();
    expect(getByText("ivysaur")).toBeInTheDocument();
    expect(getByText("poison")).toBeInTheDocument();
  });
});
