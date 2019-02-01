module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "/__tests__/.*\\.(test|spec)\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  mapCoverage: true,
  collectCoverageFrom: [
    "**/*.ts",
    "!**/__tests__/**",
    "!**/node_modules/**",
  ]
};
