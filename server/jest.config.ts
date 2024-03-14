module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.spec.ts$', // Exécute tous les fichiers qui finissent par .spec.ts
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest', // Utilise ts-jest pour transformer les fichiers ts en js
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node', // Définit l'environnement de test à node
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1', // Si vous utilisez des alias de chemin dans tsconfig
  },
  coveragePathIgnorePatterns: ['/node_modules/'],
};
