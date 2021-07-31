import { Domino } from './Domino';
import { findMostValuableChain } from './findMostValuableChain';

describe('findMostValuableChain', () => {
  test('should return an empty chain for an empty list', () => {
    expect(findMostValuableChain([])).toStrictEqual([]);
  });
  test('should return the longer chain if chains are different lengths', () => {
    const short = [Domino.from('1x2')];
    const long = [Domino.from('1x2'), Domino.from('3x4')];
    expect(findMostValuableChain([short, long])).toStrictEqual(long);
  });
  test('should return the chain with the most value if they are equal length', () => {
    const valuable = [Domino.from('9x8'), Domino.from('10x12')];
    const lessValuable = [Domino.from('1x2'), Domino.from('3x4')];
    expect(findMostValuableChain([valuable, lessValuable])).toStrictEqual(valuable);
  });
  test('should return the chain that does not end in a double if lengths and values are equal', () => {
    const endsInDouble = [Domino.from('0x1'), Domino.from('3x3')];
    const doesNotEndInDouble = [Domino.from('2x2'), Domino.from('1x2')];
    expect(findMostValuableChain([endsInDouble, doesNotEndInDouble])).toStrictEqual(doesNotEndInDouble);
  });
});
