import styled from 'styled-components/native';

export const Product = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.white};
`;

export const LeftProductInfo = styled.View`
  display: flex;
  flex-direction: row;
`;

export const ProductName = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;
