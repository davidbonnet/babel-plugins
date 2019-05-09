function handleFunctionExpression(t, path) {
  const { parentPath } = path
  if (
    parentPath.isCallExpression() &&
    parentPath.node.arguments[0] === path.node &&
    parentPath.parentPath.isVariableDeclarator() &&
    parentPath.parentPath.parentPath.node.kind === 'const'
  ) {
    const args = [
      t.stringLiteral(parentPath.parentPath.node.id.name),
      path.node,
    ]
    const params = [t.identifier('name'), t.identifier('callable')]
    const body = t.blockStatement([
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
    ])
    path.replaceWith(
      t.callExpression(
        path.isArrowFunctionExpression()
          ? t.arrowFunctionExpression(params, body)
          : t.functionExpression(null, params, body),
        args,
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
