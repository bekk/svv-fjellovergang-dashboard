import { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

const useFetch = <T, R = T>(
  fetchService: () => Promise<AxiosResponse<T>>,
  transform: (data: T) => R = (data: T) => data as unknown as R
): { data: R | null; error: any; loading: boolean } => {
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchService();
        const transformedData = transform(response.data);
        setData(transformedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { data, error, loading };
};

export default useFetch;
