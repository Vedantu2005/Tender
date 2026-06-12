import { useState, useEffect, useCallback } from 'react';

export function useApi(apiFunction, initialArgs = null, immediate = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async (args = initialArgs) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, initialArgs]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { data, loading, error, execute, setData };
}
