const parser = require('@babel/parser');
const types = require('@babel/types');
const template = require('@babel/template').default;
const core = require('@babel/core');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

const sourceCode = `
    console.log(1);

    function test() {
        console.info(2);
    }

    export default class Demo {
        say() {
            console.debug(3)
        }

        render() {
            return <div>{console.warn(4)}</div>
        }
    }
`;

const ast = parser.parse(sourceCode, {
    sourceType: "unambiguous",
    plugins: ['jsx']
});

traverse(ast, {
    CallExpression(path, state) {
        if (
            types.isMemberExpression(path.node.callee)
            && path.node.callee.object.name === 'console'
            && ['log', 'debug', 'info', 'warn'].includes(path.node.callee.property.name)
        ) {
            const {line, column} = path.node.loc.start;
            path.node.arguments.unshift(types.stringLiteral(`filename: ${line}, ${column}`));
        }
    }
});

const {code, map} = generator(ast);

console.log(code);