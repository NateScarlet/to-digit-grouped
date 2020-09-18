
.PHONY: build test default

default: build

build: dist

test:
	npm run test

dist: src/* webpack.common.js webpack.prod.js
	rm -rf dist
	npm run build
