import styled from 'styled-components/native';

export const QuantityComponent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const QuantityButton = styled.TouchableOpacity`
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.main};
  border-radius: 4px;
`;

export const QuantityValue = styled.Text`
  padding: 0px 8px;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.medium};
`;
