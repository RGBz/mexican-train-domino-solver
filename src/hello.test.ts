import hello from './hello';

describe('hello()', () => {
  test('should respond with "Hello NAME!"', () => {
    const result = hello('Gus');
    expect(result).toBe('Hello Gus!');
  });
});
