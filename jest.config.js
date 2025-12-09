module.exports = {
  preset: 'react-native',
  setupFiles: ['react-native-gesture-handler/jestSetup'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-vector-icons|@react-native-async-storage|react-native-date-picker|react-native-document-picker|react-native-element-dropdown)/)',
  ],
  moduleNameMapper: {
    '\\.(png|jpg|jpeg|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^react-native-reanimated$': 'react-native-reanimated/mock',
    '^@react-native-async-storage/async-storage$': '@react-native-async-storage/async-storage/jest/async-storage-mock',
    '^react-native-document-picker$': '<rootDir>/__mocks__/react-native-document-picker.js',
    '^react-native-date-picker$': '<rootDir>/__mocks__/react-native-date-picker.js',
    '^react-native-vector-icons/.*$': '<rootDir>/__mocks__/react-native-vector-icons.js',
  },
  testTimeout: 20000,
};
