import { Domino } from './Domino';
import { DominoSide } from './DominoSide';
import { Graph } from './Graph';

describe('Graph', () => {
  describe('when graphing 1 domino', () => {
    test('should respond with a single graph containing that domino', () => {
      const dominos = ['1x2'].map(Domino.from);
      const graphs = Graph.generateAll(dominos);
      expect(graphs.length).toEqual(1);
      expect(graphs[0].sides).toStrictEqual(new Set([DominoSide.ONE, DominoSide.TWO]));
      expect(graphs[0].dominos).toStrictEqual(dominos);
    });
  });

  describe('when graphing 2 dominos that can be paired', () => {
    test('should respond with a single graph containing both dominos', () => {
      const dominos = ['1x2', '2x3'].map(Domino.from);
      const graphs = Graph.generateAll(dominos);
      expect(graphs.length).toEqual(1);
      expect(graphs[0].sides).toStrictEqual(new Set([DominoSide.ONE, DominoSide.TWO, DominoSide.THREE]));
      expect(graphs[0].dominos).toStrictEqual(dominos);
    });
  });

  describe('when graphing 2 dominos that cannot be paired', () => {
    test('should respond with a two graphs containing one domino each', () => {
      const dominos = ['1x2', '3x4'].map(Domino.from);
      const graphs = Graph.generateAll(dominos);
      expect(graphs.length).toEqual(2);
      expect(graphs[0].sides).toStrictEqual(new Set([DominoSide.ONE, DominoSide.TWO]));
      expect(graphs[1].sides).toStrictEqual(new Set([DominoSide.THREE, DominoSide.FOUR]));
      expect(graphs[0].dominos).toStrictEqual([dominos[0]]);
      expect(graphs[1].dominos).toStrictEqual([dominos[1]]);
    });
  });

  describe('when graphing several dominos', () => {
    test('should respond with the expected graphs', () => {
      const dominos = ['1x2', '7x8', '3x4', '5x1', '3x1', '6x7'].map(Domino.from);
      const graphs = Graph.generateAll(dominos);
      expect(graphs.length).toEqual(2);
      expect(graphs[0].sides).toStrictEqual(
        new Set([DominoSide.ONE, DominoSide.TWO, DominoSide.THREE, DominoSide.FOUR, DominoSide.FIVE]),
      );
      expect(graphs[1].sides).toStrictEqual(new Set([DominoSide.SIX, DominoSide.SEVEN, DominoSide.EIGHT]));
      expect(new Set(graphs[0].dominos)).toStrictEqual(new Set([dominos[0], dominos[2], dominos[3], dominos[4]]));
      expect(new Set(graphs[1].dominos)).toStrictEqual(new Set([dominos[1], dominos[5]]));
    });
  });

  describe('findLongestPath', () => {
    test('should respond with the longest path for a set of dominos', () => {
      const dominos = ['1x2', '7x8', '3x4', '5x1', '3x1', '6x7'].map(Domino.from);
      const path = Graph.findLongestPath(dominos);
      expect(new Set(path)).toStrictEqual(
        new Set([
          new Domino([DominoSide.THREE, DominoSide.FOUR]),
          new Domino([DominoSide.THREE, DominoSide.ONE]),
          new Domino([DominoSide.ONE, DominoSide.TWO]),
        ]),
      );
    });
    test('should respond with an empty list if the starting side is not found', () => {
      const dominos = ['1x2', '7x8', '3x4', '5x1', '3x1', '6x7'].map(Domino.from);
      const path = Graph.findLongestPath(dominos, DominoSide.TWELVE);
      expect(new Set(path)).toStrictEqual(new Set([]));
    });
  });
});
