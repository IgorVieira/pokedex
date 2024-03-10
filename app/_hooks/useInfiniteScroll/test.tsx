import { renderHook } from "@testing-library/react";
import useInfiniteScroll from ".";

describe("useInfiniteScroll", () => {
  const observeMock = jest.fn();
  const disconnectMock = jest.fn();
  const loadItems = jest.fn();
  const mockElement = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("observes only when the element is not null", async () => {
    window.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: observeMock,
      disconnect: disconnectMock,
    }));

    const { result, rerender } = renderHook(() => useInfiniteScroll(loadItems));

    expect(observeMock).not.toHaveBeenCalled();
    (result.current.moreRef.current as unknown) = mockElement;

    rerender(() => useInfiniteScroll(loadItems));

    await new Promise(process.nextTick);

    expect(observeMock).toHaveBeenCalledTimes(1);
  });
});
