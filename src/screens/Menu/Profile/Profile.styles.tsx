import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 24px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const InputsContainer = styled.View``;

export const ProfileImageContainer = styled.View`
  margin-top: 12px;
  margin-bottom: 32px;
  align-items: center;
`;

export const ProfileImageContent = styled.View`
  position: relative;
`;

export const EditProfileButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: ${({ theme }) => theme.colors.main};
  border-radius: 100%;
  border: 3px solid ${({ theme }) => theme.colors.white};
  position: absolute;
  bottom: 4px;
  right: 4px;
  box-shadow: 4px 4px 2px #0d0a0b40;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.bold};
`;
