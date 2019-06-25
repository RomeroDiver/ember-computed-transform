const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require("@babel/types");

module.exports = function transform(code) {
    const ast = parser.parse(code, { sourceType: 'module' });
    traverse(ast, {
        MemberExpression(path) {
            if (path.node.property.name === 'property') {
                const args = path.container.arguments.map(arg => t.stringLiteral(arg.extra.rawValue));
                path.parentPath.replaceWith(t.callExpression(t.identifier(`Ember.computed`), [...args, path.node.object]))
            }
        },
    });

    const output = generate(ast);
    return output.code;
}