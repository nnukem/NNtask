import { useEffect, useRef, useState } from "react";

export type useFetchReturnType<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

let abortController: AbortController | null;
export const useFetch = <T>(
  url: string,
  options?: RequestInit
): useFetchReturnType<T> => {
  const abortController = useRef<AbortController>(null);
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(false);
    setError(null);
    setData(null);
    const fetchData = async () => {
      abortController.current?.abort();
      abortController.current = new AbortController();

      try {
        const response = await fetch(
          url,
          Object.assign({ signal: abortController.current?.signal }, options)
        );
        if (!response.ok) {
          setError(new Error(`HTTP error! status: ${response.status}`));
          return;
        }

        const result: T = await response.json();
        setData(result);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, isLoading, error };
};
