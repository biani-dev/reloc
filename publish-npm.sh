#!/bin/bash
npm test
npm build
cp src/index.d.ts dist/
npm pack
npm publish
