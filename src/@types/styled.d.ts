import 'styled-components';

import { colors, fonts } from '../theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    fonts: typeof fonts;
  }
}
