import React, { useEffect, useState } from 'react';
import * as S from './AddProduct.styles';
import { Button, Input, ProductCard, Spacer } from '@app/components';
import { Feather } from '@expo/vector-icons';
import defaultProducts from './defaultProducts.json';
import { FlatList } from 'react-native';
import { useShopping } from '@app/hooks/shopping';
import { AddProductProps } from './AddProduct.types';
import { Product } from '@app/models';
import toast from '@app/utils/toast';

export function AddProduct({ route, navigation }: AddProductProps) {
  const { id } = route.params;
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [storedProducts, setStoredProducts] = useState<{ [key: string]: Product }>({});
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { shopping, updateProducts, getSelectedShopping } = useShopping();

  useEffect(() => {
    const newStoredProducts: { [key: string]: Product } = {};
    const updatedSelectedProducts: Product[] = [];
    getSelectedShopping(id)?.products.forEach((product) => {
      newStoredProducts[product.id] = product;
      updatedSelectedProducts.push(product);
    });
    setSelectedProducts(updatedSelectedProducts);
    setStoredProducts(newStoredProducts);
  }, [shopping]);

  function onChangeSelectedProduct(product: Product, value: boolean) {
    value ? addProduct(product) : removeProduct(product.id);
    setShowButton(true);
  }

  function removeProduct(productId: string) {
    const updatedProducts = selectedProducts.filter((product) => product.id !== productId);

    setSelectedProducts(updatedProducts);
  }

  function addProduct(product: Product) {
    const newProduct = {
      ...product,
      quantity: 1,
    };
    const updatedProducts = [...selectedProducts, newProduct];

    setSelectedProducts(updatedProducts);
  }

  function onChangeQuantity(productId: string, quantity: number) {
    const updatedProducts = selectedProducts.map((product) => ({
      ...product,
      quantity: productId === product.id ? quantity : product.quantity,
    }));

    setSelectedProducts(updatedProducts);
    setShowButton(true);
  }

  async function onUpdate() {
    try {
      setIsLoading(true);
      await updateProducts(id, selectedProducts);
      navigation.goBack();
      toast({
        type: 'success',
        text: 'Lista de produtos atualizada.',
      });
    } catch {
      toast({
        type: 'error',
        text: 'Algo deu errado ao tentar atualizar a lista.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  function renderItem({ item }: { item: Product }) {
    return (
      <ProductCard
        key={`${item.id}-${!!storedProducts[item.id]}`}
        product={storedProducts[item.id] ? storedProducts[item.id] : item}
        isChecked={!!storedProducts[item.id]}
        changeSelectedProduct={onChangeSelectedProduct}
        changeQuantity={onChangeQuantity}
      />
    );
  }

  return (
    <S.Container>
      <Input placeholder="Pesquisar" leftIcon={<Feather name="search" size={24} color="gray" />} />

      <Spacer dimesion={24} />

      <FlatList
        data={defaultProducts.products}
        renderItem={renderItem}
        keyExtractor={(item: Product) => item.id}
        ItemSeparatorComponent={() => <Spacer dimesion={12} />}
        showsVerticalScrollIndicator={false}
      />

      <Spacer dimesion={16} />

      {showButton && (
        <Button isLoading={isLoading} onPress={onUpdate}>
          Salvar
        </Button>
      )}
    </S.Container>
  );
}
