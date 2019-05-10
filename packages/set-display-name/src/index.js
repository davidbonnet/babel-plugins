function handleFunctionExpression(t, path) {
  const { parentPath } = path
  if (
    parentPath.isCallExpression() &&
    parentPath.node.arguments[0] === path.node &&
    parentPath.parentPath.isVariableDeclarator() &&
    parentPath.parentPath.parentPath.node.kind === 'const'
  ) {
    path.replaceWith(
      t.callExpression(
        t.functionExpression(
          null,
          [t.identifier('name'), t.identifier('callable')],
          t.blockStatement([
            t.expressionStatement(
              t.assignmentExpression(
                '=',
                t.memberExpression(
                  t.identifier('callable'),
                  t.identifier('displayName'),
                ),
                t.identifier('name'),
              ),
            ),
            t.returnStatement(t.identifier('callable')),
          ]),
        ),
        [t.stringLiteral(parentPath.parentPath.node.id.name), path.node],
      ),
    )
  }
}

export default ({ types: t }) => ({
  name: 'babel-transform-set-display-name',
  visitor: {
    Program(path) {
      path.traverse({
        FunctionExpression(path) {
          if (path.node.id) {
            return
          }
          handleFunctionExpression(t, path)
        },
        ArrowFunctionExpression(path) {
          handleFunctionExpression(t, path)
        },
      })
    },
  },
})
