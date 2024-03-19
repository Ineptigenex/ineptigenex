import { sayHello } from '../src/app'

describe('App', () => {
  it('greeting', () => {
    expect(sayHello()).toBe('Hello, World!')
  })
})
