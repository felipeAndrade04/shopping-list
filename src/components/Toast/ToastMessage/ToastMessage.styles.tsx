import { ToastType } from '@app/utils/toast';
import styled, { DefaultTheme, ThemeProps, css } from 'styled-components/native';
import { FlattenInterpolation } from 'styled-components';

const toastVariants: Record<ToastType, FlattenInterpolation<ThemeProps<DefaultTheme>>> = {
  info: css`
    background: ${({ theme }) => theme.colors.main};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.green};
  `,
  error: css`
    background: ${({ theme }) => theme.colors.red};
  `,
};

export const Container = styled.TouchableOpacity<{ type: ToastType }>`
  padding: 16px;
  border-radius: 8px;
  margin-top: 12px;
  flex-direction: row;
  width: 100%;
  box-shadow: 4px 4px 2px #0d0a0b40;

  ${({ type }) => toastVariants[type] || toastVariants.info}
`;

export const Message = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.medium};
  margin: 0 12px;
`;
