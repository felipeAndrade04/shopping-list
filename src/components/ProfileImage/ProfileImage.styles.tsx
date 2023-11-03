import styled from 'styled-components/native';
import { ProfileImageProps } from './ProfileImage.types';

const sizeMap = {
  sm: 50,
  md: 50,
  lg: 148,
};

export const ProfileImageContainer = styled.View<Partial<ProfileImageProps>>`
  width: ${({ size }) => sizeMap[size]}px;
  height: ${({ size }) => sizeMap[size]}px;
  border-radius: 100%;
  background: ${({ theme }) => theme.colors.main};
`;

export const ProfileImage = styled.Image`
  flex: 1;
  border-radius: 100%;
`;

export const ProfileWithoutImage = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text<Partial<ProfileImageProps>>`
  font-size: ${({ size }) => sizeMap[size] / 2}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
`;
