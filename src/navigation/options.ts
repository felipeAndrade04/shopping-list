import { colors, fonts } from '@app/theme';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

interface LoggedHeaderBuilderParams {
  title?: string;
}

export function loggedHeaderBuilder({
  title,
}: LoggedHeaderBuilderParams): NativeStackNavigationOptions {
  return {
    title,
    headerStyle: {
      backgroundColor: colors.main,
    },
    headerTintColor: colors.white,
    headerTitleStyle: {
      fontFamily: fonts.bold,
      fontSize: 18,
    },
    headerBackTitleVisible: false,
  };
}
