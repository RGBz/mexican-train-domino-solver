export type LinkedListCursor<T> = LinkedListNode<T> | null;

export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }

  connect(next: LinkedListNode<T>): void {
    this.next = next;
  }

  private static toArray<T>(list: LinkedListCursor<T>): T[] {
    const nodes: T[] = [];
    let cursor = list;
    while (cursor) {
      nodes.push(cursor.value);
      cursor = cursor.next;
    }
    return nodes;
  }

  toArray(): T[] {
    return LinkedListNode.toArray(this);
  }
}
