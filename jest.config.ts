export default {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageDirectory: "./coverage",
  coverageReporters: ["html", "text"],
  collectCoverage: true,
  collectCoverageFrom: ["**/*.{ts,js}"],
  modulePathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
    "<rootDir>/src/models/",
    "<rootDir>/src/interfaces/",
  ],
  testMatch: ["**/*.spec.(ts|js)"],
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
