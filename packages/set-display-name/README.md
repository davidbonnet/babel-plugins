# Babel plugin: Set display name

[![NPM Version](https://img.shields.io/npm/v/babel-plugin-set-display-name.svg)](https://www.npmjs.org/package/babel-plugin-set-display-name)
[![DevDependency Status](https://david-dm.org/davidbonnet/babel-plugin-set-display-name/dev-status.svg)](https://david-dm.org/davidbonnet/babel-plugin-set-display-name?type=dev)

Sets the display name of unnamed decorated functions assigned to a constant reference.

## Installation

```bash
npm install babel-plugin-set-display-name
```

## Usage

### Via `.babelrc`

```json
{
  "plugins": ["babel-plugin-set-display-name"]
}
```

### Via the command line interface

```bash
babel --plugins babel-plugin-set-display-name file.js
```

### Via runtime API

```js
require('@babel/core').transform(code, {
  plugins: ['babel-plugin-set-display-name'],
})
```

## Motivation

Functions are often decorated at the same time they are declared. This is often the case for React components, especially when used with [Recompose](https://github.com/acdlite/recompose):

```jsx
const Div = compose(pure)(({ value }) => <div>{value}</div>)
```

However, in doing so, all components become unnamed, and error logs mention generic names (e.g., "Component") instead of "Div" in the example above.

This plugin only makes sense during development mode, and applies to any decorated function (not just React components) assigned to a `const` reference.

## Example

### In

```jsx
export const Div = React.memo(({ value }) => <div>{value}</div>)
```

### Out

```jsx
export const Div = React.memo(
  ((name, callable) => {
    callable.displayName = name
    return callable
  })('Div', ({ value }) => <div>{value}</div>),
)
```
