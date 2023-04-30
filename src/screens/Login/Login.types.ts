import { AuthStackNavigationProps } from '@app/navigation/stackNavigation/auth';

export interface LoginProps {
  navigation: AuthStackNavigationProps;
}

export interface LoginFormData {
  email: string;
  password: string;
}
