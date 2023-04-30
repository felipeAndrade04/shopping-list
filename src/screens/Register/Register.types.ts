import { AuthStackNavigationProps } from '@app/navigation/stackNavigation/auth';

export interface RegisterProps {
  navigation: AuthStackNavigationProps;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
