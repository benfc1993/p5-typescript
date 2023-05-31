/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/src/lib/components/$1',
        '^@components$': '<rootDir>/src/lib/components',
        '^@utils/(.*)$': '<rootDir>/src/lib/utils/$1',
        '^@utils$': '<rootDir>/src/lib/utils',
        '^@libTypes/(.*)$': '<rootDir>/src/lib/types/$1',
        '^@libTypes$': '<rootDir>/src/lib/types',
    },
}
