import { useEffect } from "react";

export const usePageData = (dataLoaders: (() => Promise<void>)[]) => {
  useEffect(() => {
    Promise.all(dataLoaders.map((loader) => loader()));
  }, []);
};
