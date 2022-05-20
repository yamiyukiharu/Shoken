module.exports = {
    preset: 'react-native',
    transformIgnorePatterns: [
      'node_modules/(?!@react-native-google-signin|react-native|@react-native|@react-navigation|@react-native-firebase/firestore|@react-native-community/async-storage|@invertase/react-native-apple-authentication)',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFiles: ['<rootDir>/jest.setup.ts'],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  };