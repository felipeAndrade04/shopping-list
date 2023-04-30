import { AuthStackNavigationProps } from '@app/navigation/stackNavigation/auth';

export interface ForgotPasswordProps {
  navigation: AuthStackNavigationProps;
}

export interface ForgotPasswordFormData {
  email: string;
}
