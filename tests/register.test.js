import test from 'node:test'
import assert from 'node:assert/strict'
import { createApp } from '../reg_user.js'

test('returns a 400 response for malformed JSON', async () => {
  const app = createApp()
  const server = app.listen(0)

  await new Promise((resolve) => server.once('listening', resolve))
  const { port } = server.address()

  try {
    const response = await fetch(`http://127.0.0.1:${port}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{"name":'
    })

    assert.equal(response.status, 400)
    const data = await response.json()
    assert.equal(data.error, 'Invalid JSON payload')
  } finally {
    await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())))
  }
})

test('accepts URL-encoded form submissions', async () => {
  const app = createApp()
  const server = app.listen(0)

  await new Promise((resolve) => server.once('listening', resolve))
  const { port } = server.address()

  try {
    const response = await fetch(`http://127.0.0.1:${port}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'name=Jane&email=jane@example.com&password=secret123'
    })

    assert.equal(response.status, 201)
    const data = await response.json()
    assert.equal(data.message, 'User registered successfully')
  } finally {
    await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())))
  }
})
