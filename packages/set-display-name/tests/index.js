import { readdir, readFile } from 'fs'
import { join, basename } from 'path'
import { promisify } from 'util'

import test from 'ava'
import { transform } from '@babel/core'

import '../src'

const readdirAsync = promisify(readdir)
const readFileAsync = promisify(readFile)
const transformAsync = promisify(transform)

test('set-display-name', async (assert) => {
  const directoryName = join(__dirname, '../fixtures')
  const fileNames = (await readdirAsync(directoryName)).sort()
  const options = {
    babelrc: false,
    plugins: [join(__dirname, '../src')],
  }
  for (const fileName of fileNames) {
    const code = await readFileAsync(join(directoryName, fileName), 'utf8')
    const { code: transformedCode } = await transformAsync(code, options)
    assert.snapshot(transformedCode, basename(fileName))
  }
})

test('set-display-name with setName', async (assert) => {
  const directoryName = join(__dirname, '../fixtures')
  const fileNames = (await readdirAsync(directoryName)).sort()
  const options = {
    babelrc: false,
    plugins: [[join(__dirname, '../src'), { setName: true }]],
  }
  for (const fileName of fileNames) {
    const code = await readFileAsync(join(directoryName, fileName), 'utf8')
    const { code: transformedCode } = await transformAsync(code, options)
    assert.snapshot(transformedCode, basename(fileName))
  }
})
