import { Domino } from './Domino';
import { DominoSide } from './DominoSide';

describe('Domino', () => {
  describe('from', () => {
    test('should create a domino when valid numbers are specified separated by an x', () => {
      expect(Domino.from('1x2')).toStrictEqual(new Domino([DominoSide.ONE, DominoSide.TWO]));
    });

    test.each(['x', 'xx', 'xxx', '', '1x', 'x2', '0.9x0.1', '12x13'])("should throw an error for '%s'", (str) => {
      expect(() => Domino.from(str)).toThrow();
    });
  });

  describe('toString', () => {
    test('should create a string representation of the domino', () => {
      expect(Domino.from('1x2').toString()).toEqual('1x2');
    });
  });

  describe('canPair', () => {
    test('should respond with true when there are sides that match', () => {
      expect(Domino.from('1x2').canPair(Domino.from('2x3'))).toBe(true);
    });

    test('should respond with false when there are not sides that match', () => {
      expect(Domino.from('1x2').canPair(Domino.from('3x4'))).toBe(false);
    });
  });

  describe('getOtherSide', () => {
    test('should throw an error when not provided a matching side', () => {
      expect(() => Domino.from('1x2').getOtherSide(DominoSide.EIGHT)).toThrow();
    });

    test('should return the second side when the first side is specified', () => {
      expect(Domino.from('1x2').getOtherSide(DominoSide.ONE)).toEqual(DominoSide.TWO);
    });

    test('should return the first side when the second side is specified', () => {
      expect(Domino.from('1x2').getOtherSide(DominoSide.TWO)).toEqual(DominoSide.ONE);
    });
  });
});
