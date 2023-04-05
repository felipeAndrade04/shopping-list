import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

export type AuthStackNavigationProps = NativeStackNavigationProp<AuthStackParamList>;
