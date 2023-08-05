jest.mock('react-native/Libraries/Utilities/Platform', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fs = require('fs');
  const json = JSON.parse(fs.readFileSync('node_modules/react-native/package.json', 'utf8'));
  const platform = jest.requireActual('react-native/Libraries/Utilities/Platform');
  const version = json.version.toString().split('.');
  return {
    ...platform,
    constants: {
      ...platform.constants,
      reactNativeVersion: {
        major: version[0],
        minor: version[1],
        patch: version[2],
      },
    },
  };
});
