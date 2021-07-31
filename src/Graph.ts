import { Domino } from './Domino';
import { DominoSide } from './DominoSide';
import { LinkedListCursor, LinkedListNode } from './LinkedListNode';

type Cursor = LinkedListCursor<Graph>;

export class Graph {
  dominos: Domino[] = [];
  nodes: Map<DominoSide, Set<Domino>> = new Map();

  static findLongestPath(dominos: Domino[], startingSide?: DominoSide): Domino[] {
    const graphs = Graph.create(dominos);
    let largest = graphs[0].findLongestPath(startingSide);
    for (let i = 1; i < graphs.length; i++) {
      const longest = graphs[i].findLongestPath(startingSide);
      if (longest.length > largest.length) {
        largest = longest;
      }
    }
    return largest;
  }

  static create(dominos: Domino[]): Graph[] {
    const root = new LinkedListNode(new Graph());
    for (const domino of dominos) {
      let didAdd = false;
      let cursor: Cursor = root;
      let prev: Cursor = null;
      let lastMatch: Cursor = null;
      while (cursor) {
        if (cursor.value.canAdd(domino)) {
          didAdd = true;
          if (lastMatch) {
            lastMatch.value.merge(cursor.value);
            if (prev) {
              prev.next = cursor.next;
            }
          } else {
            cursor.value.add(domino);
            lastMatch = cursor;
          }
        }
        // If we're at the end of the list and we haven't added the domino, then add a new Group
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

  findLongestPath(lastSide?: DominoSide, path: Domino[] = []): Domino[] {
    if (!lastSide) {
      return longest([...this.sides].map((side) => this.findLongestPath(side)));
    }
    const dominos = [...(this.nodes.get(lastSide) ?? [])].filter((domino) => !path.includes(domino));
    if (dominos.length === 0) {
      return path;
    }
    return longest(dominos.map((domino) => this.findLongestPath(domino.getOtherSide(lastSide), path.concat(domino))));
  }
}

function longest<T>(arrays: T[][]): T[] {
  let longestIndex = 0;
  for (let i = longestIndex + 1; i < arrays.length; i++) {
    if (arrays[i].length > arrays[longestIndex].length) {
      longestIndex = i;
    }
  }
  return arrays[longestIndex];
}