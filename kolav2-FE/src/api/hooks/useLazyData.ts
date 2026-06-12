import { useCallback, useRef } from "react";

interface DataLoader {
  key: string;
  loader: () => Promise<void>;
  dependencies?: string[];
  noCache?: boolean;
}

export const useLazyData = () => {
  const loadedData = useRef<Set<string>>(new Set());
  const loadingData = useRef<Set<string>>(new Set());

  const loadData = useCallback(async (loaders: DataLoader[]) => {
    const toLoad = loaders.filter((loader) => {
      if (loader.noCache) return true;
      return (
        !loadedData.current.has(loader.key) &&
        !loadingData.current.has(loader.key)
      );
    });

    if (toLoad.length === 0) return;

    toLoad.forEach((loader) => {
      if (!loader.noCache) {
        loadingData.current.add(loader.key);
      }
    });

    try {
      await Promise.all(toLoad.map((loader) => loader.loader()));
      toLoad.forEach((loader) => {
        if (!loader.noCache) {
          loadedData.current.add(loader.key);
          loadingData.current.delete(loader.key);
        }
      });
    } catch (error) {
      toLoad.forEach((loader) => {
        if (!loader.noCache) {
          loadingData.current.delete(loader.key);
        }
      });
      throw error;
    }
  }, []);

  const isLoaded = useCallback(
    (key: string) => loadedData.current.has(key),
    []
  );
  const isLoading = useCallback(
    (key: string) => loadingData.current.has(key),
    []
  );

  const invalidateData = useCallback((keys: string[]) => {
    keys.forEach((key) => {
      loadedData.current.delete(key);
      loadingData.current.delete(key);
    });
  }, []);

  // method to invalidate all cache
  const invalidateAllData = useCallback(() => {
    loadedData.current.clear();
    loadingData.current.clear();
  }, []);

  // method to force reload data
  const forceReloadData = useCallback(
    async (loaders: DataLoader[]) => {
      // Remove from cache first
      loaders.forEach((loader) => {
        loadedData.current.delete(loader.key);
        loadingData.current.delete(loader.key);
      });
      // Then load fresh data
      await loadData(loaders);
    },
    [loadData]
  );

  return {
    loadData,
    isLoaded,
    isLoading,
    invalidateData,
    invalidateAllData,
    forceReloadData,
  };
};
