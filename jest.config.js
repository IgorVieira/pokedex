module.exports = {
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/?(*.)(test).ts?(x)"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/meeting/(.*)$": "<rootDir>/meeting/$1",
    "^@/src/(.*)$": "<rootDir>/src/$1",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@/queries$": "<rootDir>/src/lib/graphql/queries.ts",
    "^@/mutations$": "<rootDir>/src/lib/graphql/mutations.ts",
    "^@/graphql$": "<rootDir>/src/lib/graphql/index.ts",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/.jest/setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
};
