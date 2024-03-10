import { renderHook } from "@testing-library/react";
import { useSearchPokemonByName } from ".";

jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        name: "bulbasaur",
        sprites: {
          front_default: "https://pokeapi.co/api/v2/pokemon/1/",
        },
      },
    })
  ),
}));

jest.mock("fast-average-color", () => {
  return {
    FastAverageColor: jest.fn().mockImplementation(() => {
      return {
        getColorAsync: jest.fn(() => Promise.resolve({ hex: "#123456" })),
      };
    }),
  };
});

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(() => ({
    data: {
      name: "bulbasaur",
      sprites: {
        front_default: "https://pokeapi.co/api/v2/pokemon/1/",
      },
      color: "#123456",
    },
    isLoading: false,
    error: undefined,
  })),
}));

describe("useSearchPokemonByName", () => {
  it("fetches Pokemon data with default parameters", async () => {
    const searchTerm = "bulbasaur";
    const { result } = renderHook(() => useSearchPokemonByName(searchTerm));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.pokemon).toBeDefined();
  });
});
