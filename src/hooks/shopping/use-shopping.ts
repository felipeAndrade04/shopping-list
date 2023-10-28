import { Product, Shopping } from '@app/models';
import services from '@app/services';
import { useEffect, useState } from 'react';

export function useShopping() {
  const [isLoading, setIsLoading] = useState(false);
  const [shopping, setShopping] = useState<Shopping[]>([]);

  useEffect(() => {
    const unSubscribe = services.shopping.list(setShopping);

    return () => {
      unSubscribe();
    };
  }, []);

  async function create(name: string) {
    try {
      setIsLoading(true);
      const response = await services.shopping.create(name);
      console.tron.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateProducts(shoppingId: string, products: Product[]) {
    try {
      setIsLoading(true);
      const response = await services.shopping.updateProducts(shoppingId, products);
      console.tron.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function getSelectedShopping(id: string) {
    return shopping.find((s) => s.id === id);
  }

  return {
    isLoading,
    shopping,
    create,
    updateProducts,
    getSelectedShopping,
  };
}
