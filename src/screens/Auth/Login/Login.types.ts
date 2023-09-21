import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@app/navigation/stackNavigation/auth';

export type LoginProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;
