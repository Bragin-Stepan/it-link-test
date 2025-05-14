import type { Config } from 'jest';

const config: Config = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	testEnvironment: 'node',
	rootDir: 'src',
	testMatch: ['<rootDir>/**/*.spec.ts'],
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest'
	},
	moduleNameMapper: {
		'^#(.*)$': '<rootDir>/$1',
		'^@/src/(.*)$': '<rootDir>/$1',
		'^@/core/(.*)$': '<rootDir>/core/$1',
		'^@/shared/(.*)$': '<rootDir>/shared/$1'
	},
	modulePaths: ['<rootDir>']
};

export default config;
