import { Shopping } from '@app/models';
import services from '@app/services';
import { useEffect, useState } from 'react';

export function useShopping() {
  const [isLoading, setIsLoading] = useState(false);
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

  return {
    isLoading,
    create,
  };
}
