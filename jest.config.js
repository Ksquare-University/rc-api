/** @types {import('ts-jest/dist/types').JestConfigWithJest} */

module.exports ={
    clearMocks:true,
    coverageProvider:'v8',
    moduleFileExtension:['js', 'ts'],
    root:["<rootDir>/src"],
    preset:'ts-jest',
    testEnvironment:'node'
}
