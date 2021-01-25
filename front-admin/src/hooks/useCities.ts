import { useCallback, useState } from 'react';
import api from '../services/api';
import City from '../types/city';

// type State<T> = [T, React.Dispatch<SetStateAction<T>>];

interface UseCities {
  loadCities(): void;
  cities: City[];
}

const useCities = (): UseCities => {
  const [cities, setCities] = useState<City[]>([]);

  const loadCities = useCallback(() => {
    api
      .get<{ data: City[] }>('/cities')
      .then((data) =>
        setCities(data.data.data.map((city) => ({ ...city, locals: 1 }))),
      );
  }, []);

  return { loadCities, cities };
};

export default useCities;
