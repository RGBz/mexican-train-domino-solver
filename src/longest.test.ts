import { longest } from './longest';

describe('longest', () => {
  test('should return undefined on an empty list', () => {
    expect(longest([])).toBeUndefined();
  });
  test('should return the longest list from a list of lists', () => {
    const short: number[] = [];
    const longer: number[] = [1];
    const longerer: number[] = [1, 2];
    expect(longest([short, longer, longerer])).toBe(longerer);
  });
});
