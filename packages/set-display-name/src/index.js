const EMPTY_OBJECT = {}

function handleFunctionExpression(
  t,
  path,
  { setProperty = false } = EMPTY_OBJECT,
) {
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
          t.blockStatement(
            [
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
              setProperty &&
                t.expressionStatement(
                  t.callExpression(
                    t.memberExpression(
                      t.identifier('Object'),
                      t.identifier('setProperty'),
                    ),
                    [
                      t.identifier('callable'),
                      t.stringLiteral('name'),
                      t.objectExpression([
                        t.spreadElement(
                          t.callExpression(
                            t.memberExpression(
                              t.identifier('Object'),
                              t.identifier('getOwnPropertyDescriptor'),
                            ),
                            [t.identifier('callable'), t.stringLiteral('name')],
                          ),
                        ),
                        t.objectProperty(
                          t.identifier('value'),
                          t.stringLiteral(parentPath.parentPath.node.id.name),
                          false,
                          false,
                        ),
                      ]),
                    ],
                  ),
                ),
              t.returnStatement(t.identifier('callable')),
            ].filter(Boolean),
          ),
        ),
        [t.stringLiteral(parentPath.parentPath.node.id.name), path.node],
      ),
    )
  }
}

export default ({ types: t }) => ({
  name: 'babel-transform-set-display-name',
  visitor: {
    Program(path, state) {
      path.traverse({
        FunctionExpression(path) {
          if (path.node.id) {
            return
          }
          handleFunctionExpression(t, path, state.opts)
        },
        ArrowFunctionExpression(path) {
          handleFunctionExpression(t, path, state.opts)
        },
      })
    },
  },
})
