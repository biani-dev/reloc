#!/bin/bash
#npm login
npm test
npm run build
cp src/index.d.ts dist/
npm pack
npm publish
