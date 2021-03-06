import { Domino } from './Domino';
import { DominoSide } from './DominoSide';
import { LinkedListCursor, LinkedListNode } from './LinkedListNode';
import { findMostValuableChain } from './findMostValuableChain';

type Cursor = LinkedListCursor<Graph>;

export class Graph {
  dominoes: Domino[] = [];
  nodes: Map<DominoSide, Set<Domino>> = new Map();

  static findMostValuableChain(dominoes: Domino[], startingSide?: DominoSide): Domino[] {
    return findMostValuableChain(Graph.generateAll(dominoes).map((graph) => graph.findMostValuableChain(startingSide)));
  }

  static generateAll(dominoes: Domino[]): Graph[] {
    const root = new LinkedListNode(new Graph());
    for (const domino of dominoes) {
      let didAdd = false;
      let cursor: Cursor = root;
      let prev: LinkedListNode<Graph> = cursor;
      let lastMatch: Cursor = null;
      while (cursor) {
        if (cursor.value.canAdd(domino)) {
          didAdd = true;
          if (lastMatch) {
            lastMatch.value.merge(cursor.value);
            prev.next = cursor.next;
          } else {
            cursor.value.add(domino);
            lastMatch = cursor;
          }
        }
        if (!cursor.next && !didAdd) {
          cursor.next = new LinkedListNode(new Graph());
        }
        prev = cursor;
        cursor = cursor.next;
      }
    }
    return root.toArray();
  }

  get sides(): Set<DominoSide> {
    return new Set(this.nodes.keys());
  }

  canAdd(domino: Domino): boolean {
    return this.nodes.size === 0 || domino.sides.some((s) => this.nodes.has(s));
  }

  add(domino: Domino): void {
    this.dominoes.push(domino);
    for (const side of domino.sides) {
      this.nodes.set(side, (this.nodes.get(side) || new Set()).add(domino));
    }
  }

  merge(other: Graph): void {
    for (const domino of other.dominoes) {
      this.add(domino);
    }
  }

  findMostValuableChain(sideToConnectTo?: DominoSide, path: Domino[] = []): Domino[] {
    if (sideToConnectTo === undefined) {
      return findMostValuableChain([...this.sides].map((side) => this.findMostValuableChain(side)));
    }
    const dominoes = [...(this.nodes.get(sideToConnectTo) ?? [])].filter((domino) => !path.includes(domino));
    if (dominoes.length === 0) {
      return path;
    }
    return findMostValuableChain(
      dominoes.map((domino) => this.findMostValuableChain(domino.getOtherSide(sideToConnectTo), path.concat(domino))),
    );
  }
}
