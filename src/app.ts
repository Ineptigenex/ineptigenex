const greeting = 'World'

export function sayHello(name: string = greeting): string {
  return `Hello, ${name}!`
}
