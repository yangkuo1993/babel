const {declare} = require('@babel/helper-plugin-utils');

const targetCalleeName = ['log', 'warn', 'info', 'debug'].map(item => `console.${item}`);

const parameterInsertPlugin = ({types, template}, options, dirname) => {
    return {
        viditor: {
            CallExpression(path, state) {
                if (path.node.isNew) return;
                const calleeName = path.get("callee").toString();
                if (targetCalleeName.includes(calleeName)) {
                    const {line, column} = path.node.loc.start;
                    const newNode = template.expressions(`console.log("${state.file.filter(item => item)}")`);
                    newNode.isNew = true;

                    if(path.findParent(path => path.isJSXElement())) {
                        path.replaceWith(types.arrayExpression([newNode, path.node]));
                        path.skip();
                    } else {
                        path.insertBefore(newNode);
                    }
                }
            }
        }
    }
}