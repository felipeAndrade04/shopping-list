import 'styled-components';

import { colors, fonts } from '@app/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    fonts: typeof fonts;
  }
}
