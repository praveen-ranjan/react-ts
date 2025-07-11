import { useEffect, useState } from 'react';
import type { Product } from '../types/products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const response = await fetch("https://685989cd138a18086dfec72b.mockapi.io/api/v1/productList");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  return { products, loading, error };
};
