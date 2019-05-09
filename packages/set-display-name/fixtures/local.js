const A = compose(decorators)((props) => null)

const B = compose(decorators)(function(props) {
  return null
})

export { A, B }
