#!/bin/bash
#npm login
yarn test
yarn run build
cp src/index.d.ts dist/
npm pack
npm publish
