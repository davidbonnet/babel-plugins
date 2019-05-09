export const A = compose(decorator((value) => value))((props) => null)

export const B = compose(decorator((value) => value))(function(props) {
  return null
})
