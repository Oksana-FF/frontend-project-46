install:
	npm ci

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npm eslint .

test-coverage:
	npm jest --coverage

test:
	npx jest
