jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  getAuth: () => ({
    currentUser: {
      uid: 'mocked-uid',
      email: 'mocked@example.com',
    },
    apiKey: '',
    authDomain: '',
    appName: '',
  }),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onAuthStateChanged: () => () => {},
}));
