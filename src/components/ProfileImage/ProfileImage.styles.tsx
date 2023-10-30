import styled from 'styled-components/native';
import { ProfileImageProps } from './ProfileImage.types';

const sizeMap = {
  sm: '50px',
  md: '50px',
  lg: '50px',
};

export const ProfileImageContainer = styled.View<Partial<ProfileImageProps>>`
  width: ${({ size }) => sizeMap[size]};
  height: ${({ size }) => sizeMap[size]};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.main};
`;

export const ProfileImage = styled.Image`
  flex: 1;
  border-radius: 50%;
`;

export const ProfileWithoutImage = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`;
