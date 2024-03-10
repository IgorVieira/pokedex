import { useEffect, useRef, useState } from "react";

function useInfiniteScroll(
  loadItems: () => void,
  props?: IntersectionObserverInit
) {
  const [isInView, setIsInView] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView) {
      loadItems();
    }
  }, [isInView, loadItems]);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const element = moreRef.current;

    const onChange = (entries: IntersectionObserverEntry[]) => {
      const el = entries[0];
      if (el.isIntersecting) {
        if (!isInView) setIsInView(true);
      } else setIsInView(false);
    };

    observer = new IntersectionObserver(onChange, props);

    if (element) observer.observe(element);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  });

  return { moreRef };
}

export default useInfiniteScroll;
