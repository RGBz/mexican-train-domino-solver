import { Domino } from './Domino';
import { DominoSide } from './DominoSide';
import { Graph } from './Graph';

describe('Graph', () => {
  describe('when graphing 1 domino', () => {
    test('should respond with a single graph containing that domino', () => {
      const dominoes = ['1x2'].map(Domino.from);
      const graphs = Graph.generateAll(dominoes);
      expect(graphs.length).toEqual(1);
      expect(graphs[0].sides).toStrictEqual(new Set([DominoSide.ONE, DominoSide.TWO]));
      expect(graphs[0].dominoes).toStrictEqual(dominoes);
    });
  });

  describe('when graphing 2 dominoes that can be paired', () => {
    test('should respond with a single graph containing both dominoes', () => {
      const dominoes = ['1x2', '2x3'].map(Domino.from);
      const graphs = Graph.generateAll(dominoes);
      expect(graphs.length).toEqual(1);
      expect(graphs[0].sides).toStrictEqual(new Set([DominoSide.ONE, DominoSide.TWO, DominoSide.THREE]));
      expect(graphs[0].dominoes).toStrictEqual(dominoes);
    });
  });

  describe('when graphing 2 dominoes that cannot be paired', () => {
    test('should respond with a two graphs containing one domino each', () => {
      const dominoes = ['1x2', '3x4'].map(Domino.from);
      const graphs = Graph.generateAll(dominoes);
      expect(graphs.length).toEqual(2);
      expect(graphs[0].sides).toStrictEqual(new Set([DominoSide.ONE, DominoSide.TWO]));
      expect(graphs[1].sides).toStrictEqual(new Set([DominoSide.THREE, DominoSide.FOUR]));
      expect(graphs[0].dominoes).toStrictEqual([dominoes[0]]);
      expect(graphs[1].dominoes).toStrictEqual([dominoes[1]]);
    });
  });

  describe('when graphing several dominoes', () => {
    test('should respond with the expected graphs', () => {
      const dominoes = ['1x2', '7x8', '3x4', '5x1', '3x1', '6x7'].map(Domino.from);
      const graphs = Graph.generateAll(dominoes);
      expect(graphs.length).toEqual(2);
      expect(graphs[0].sides).toStrictEqual(
        new Set([DominoSide.ONE, DominoSide.TWO, DominoSide.THREE, DominoSide.FOUR, DominoSide.FIVE]),
      );
      expect(graphs[1].sides).toStrictEqual(new Set([DominoSide.SIX, DominoSide.SEVEN, DominoSide.EIGHT]));
      expect(new Set(graphs[0].dominoes)).toStrictEqual(new Set([dominoes[0], dominoes[2], dominoes[3], dominoes[4]]));
      expect(new Set(graphs[1].dominoes)).toStrictEqual(new Set([dominoes[1], dominoes[5]]));
    });
  });

  describe('findMostValuableChain', () => {
    test('should respond with the most valuable chain for a given set of dominoes', () => {
      const dominoes = ['1x2', '7x8', '3x4', '5x1', '3x1', '6x7'].map(Domino.from);
      const path = Graph.findMostValuableChain(dominoes);
      expect(new Set(path)).toStrictEqual(new Set([Domino.from('5x1'), Domino.from('3x1'), Domino.from('3x4')]));
    });
    test('should respond with an empty list if the starting side is not found', () => {
      const dominoes = ['1x2', '7x8', '3x4', '5x1', '3x1', '6x7'].map(Domino.from);
      const path = Graph.findMostValuableChain(dominoes, DominoSide.TWELVE);
      expect(new Set(path)).toStrictEqual(new Set([]));
    });
  });
});
