install:
	npm ci
lint:
	npx eslint
test:
	node __tests__/genDiff.test.js