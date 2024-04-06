/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@components$': '<rootDir>/src/components',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@utils$': '<rootDir>/src/utils',
        '^@libTypes/(.*)$': '<rootDir>/src/types/$1',
        '^@libTypes$': '<rootDir>/src/types',
    },
}
