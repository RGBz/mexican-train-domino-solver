import { Domino } from './Domino';
import { DominoSide } from './DominoSide';
import { LinkedListCursor, LinkedListNode } from './LinkedListNode';
import { longest } from './longest';

type Cursor = LinkedListCursor<Graph>;

export class Graph {
  dominos: Domino[] = [];
  nodes: Map<DominoSide, Set<Domino>> = new Map();

  static findLongestPath(dominos: Domino[], startingSide?: DominoSide): Domino[] {
    return longest(Graph.generateAll(dominos).map((graph) => graph.findLongestPath(startingSide)));
  }

  static generateAll(dominos: Domino[]): Graph[] {
    const root = new LinkedListNode(new Graph());
    for (const domino of dominos) {
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
    this.dominos.push(domino);
    for (const side of domino.sides) {
      this.nodes.set(side, (this.nodes.get(side) || new Set()).add(domino));
    }
  }

  merge(other: Graph): void {
    for (const domino of other.dominos) {
      this.add(domino);
    }
  }

  findLongestPath(sideToConnectTo?: DominoSide, path: Domino[] = []): Domino[] {
    if (!sideToConnectTo) {
      return longest([...this.sides].map((side) => this.findLongestPath(side)));
    }
    const dominos = [...(this.nodes.get(sideToConnectTo) ?? [])].filter((domino) => !path.includes(domino));
    if (dominos.length === 0) {
      return path;
    }
    return longest(
      dominos.map((domino) => this.findLongestPath(domino.getOtherSide(sideToConnectTo), path.concat(domino))),
    );
  }
}
