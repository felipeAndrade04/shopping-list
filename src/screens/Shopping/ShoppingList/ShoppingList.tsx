import React, { useEffect } from 'react';
import { ShoppingListProps } from './ShoppingList.types';
import * as S from './ShoppingList.styles';
import { Message, ProductCard, Spacer } from '@app/components';
import { useShopping } from '@app/hooks/shopping';
import { FlatList } from 'react-native-gesture-handler';
import { Product } from '@app/models';

export function ShoppingList({ navigation, route }: ShoppingListProps) {
  const { id } = route.params;
  const { getSelectedShopping, updateProducts } = useShopping();
  const selectedShopping = getSelectedShopping(id);

  useEffect(() => {
    navigation.setOptions({ title: selectedShopping?.name ?? '' });
  }, [navigation, selectedShopping]);

  const products = selectedShopping?.products?.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  function navigateToAddProduct() {
    navigation.navigate('AddProduct', { id });
  }

  async function onChangeSelectedProduct(selectedProduct: Product, value: boolean) {
    const filteredProducts: Product[] = selectedShopping?.products?.filter(
      (product) => product.id !== selectedProduct.id
    );

    const updatedProducts: Product[] = [
      ...filteredProducts,
      { ...selectedProduct, checked: value },
    ];

    await updateProducts(id, updatedProducts);
  }

  function renderItem({ item }: { item: Product }) {
    return (
      <ProductCard
        key={`${item.id}-${item.checked}-${item.quantity}`}
        isSimpleCard={true}
        product={item}
        isChecked={item.checked}
        changeSelectedProduct={onChangeSelectedProduct}
      />
    );
  }

  return (
    <S.Container>
      {selectedShopping?.products?.length ? (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item: Product) => item.id}
          ItemSeparatorComponent={() => <Spacer dimesion={12} />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Message
          title="Lista de compras vazia"
          description="Clique no botão de adicionar para iniciar a criar sua lista"
        />
      )}

      <Spacer dimesion={72} />

      <S.ButtonAddProduct variant="outline" onPress={navigateToAddProduct}>
        + Adicionar produtos
      </S.ButtonAddProduct>
    </S.Container>
  );
}
