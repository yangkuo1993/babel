const parser = require('@babel/parser');
const types = require('@babel/types');
const template = require('@babel/template').default;
const {transformFromAstSync} = require('@babel/core');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const fs = require('fs');
const path = require('path');
const autoTrackPlugin = require('./auto-track-plugin');

const sourceCode = fs.readFileSync(path.join(__dirname, './sourceCode2.js'), {
    encoding: 'utf8'
});



const ast = parser.parse(sourceCode, {
    sourceType: "unambiguous",
    plugins: ['jsx']
});

const {code} = transformFromAstSync(ast, sourceCode, {
    plugins: [[autoTrackPlugin, {
        trackerPath: 'tracker'
    }]]
});

console.log(code);