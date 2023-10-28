import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@app/navigation/stackNavigation/auth';

export type WelcomeProps = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;
