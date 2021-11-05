const parser = require('@babel/parser');
const types = require('@babel/types');
const template = require('@babel/template').default;
const {transformFromAstSync} = require('@babel/core');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const fs = require('fs');
const path = require('path');
const autoTrackPlugin = require('./functionTrack/auto-track-plugin');
const autoI18nPlugin = require('./i18ndemo/auto-i18n-plugin');

const sourceCode = fs.readFileSync(path.join(__dirname, './sourceCode3.js'), {
    encoding: 'utf8'
});



const ast = parser.parse(sourceCode, {
    sourceType: "unambiguous",
    plugins: ['jsx']
});

// traverse(ast, {
//     CallExpression(path, state) {
//         if (
//             types.isMemberExpression(path.node.callee)
//             && path.node.callee.object.name === 'console'
//             && ['log', 'debug', 'info', 'warn'].includes(path.node.callee.property.name)
//         ) {
//             const {line, column} = path.node.loc.start;
//             path.node.arguments.unshift(types.stringLiteral(`filename: ${line}, ${column}`));
//         }
//     }
// });

const {code} = transformFromAstSync(ast, sourceCode, {
    plugins: [[autoI18nPlugin, {
        outputDir: './language/'
    }]]
});

console.log(code);