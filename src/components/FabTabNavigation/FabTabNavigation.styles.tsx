import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.main};
  align-items: center;
  justify-content: center;
`;
