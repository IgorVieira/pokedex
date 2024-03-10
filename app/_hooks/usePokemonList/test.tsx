import { renderHook } from "@testing-library/react";
import { usePokemonList } from ".";
import { mockPokemons } from "./mock";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: { results: mockPokemons } })),
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
    data: mockPokemons,
    isLoading: false,
    error: undefined,
  })),
}));

const pokemonDataSpy = jest.spyOn(
  require("../usePokemonList"),
  "fetchPokemonArray"
);

describe("usePokemonList", () => {
  it("should fetch Pokemon data with default parameters", async () => {
    pokemonDataSpy.mockImplementation(() => {
      mockPokemons;
    });

    const { result } = renderHook(() => usePokemonList());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(Array.isArray(result.current.pokemons)).toBe(true);
  });

  it("should fetch Pokemon data with custom parameters", async () => {
    const customLimit = 10;
    const customOffset = 1;
    const { result } = renderHook(() =>
      usePokemonList({ limit: customLimit, offset: customOffset })
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(Array.isArray(result.current.pokemons)).toBe(true);
  });
});
