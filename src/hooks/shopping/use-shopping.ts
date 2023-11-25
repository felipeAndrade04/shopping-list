import { Product, Shopping } from '@app/models';
import services from '@app/services';
import toast from '@app/utils/toast';
import { useEffect, useState } from 'react';

export function useShopping() {
  const [isLoading, setIsLoading] = useState(false);
  const [shopping, setShopping] = useState<Shopping[]>([]);

  useEffect(() => {
    const unSubscribe = services.shopping?.list(setShopping);

    return () => {
      unSubscribe();
    };
  }, []);

  async function create(name: string) {
    try {
      setIsLoading(true);
      await services.shopping.create(name);
      toast({ type: 'success', text: 'Lista criada com sucesso!' });
    } catch (error) {
      toast({ type: 'error', text: 'Algo deu errado ao tentar criar a lista!' });
    } finally {
      setIsLoading(false);
    }
  }

  async function updateProducts(shoppingId: string, products: Product[]) {
    try {
      setIsLoading(true);
      await services.shopping.updateProducts(shoppingId, products);
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
