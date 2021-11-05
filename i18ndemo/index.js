const parser = require('@babel/parser');
const types = require('@babel/types');
const {transformFromAstSync} = require('@babel/core');
const fs = require('fs');
const path = require('path');
const autoI18nPlugin = require('./auto-i18n-plugin');

const sourceCode = fs.readFileSync(path.join(__dirname, './sourceCode3.js'), {
    encoding: 'utf8'
});



const ast = parser.parse(sourceCode, {
    sourceType: "unambiguous",
    plugins: ['jsx']
});


const {code} = transformFromAstSync(ast, sourceCode, {
    plugins: [[autoI18nPlugin, {
        outputDir: './language/'
    }]]
});

console.log(code);