import { LinkedListNode } from './LinkedListNode';

describe('LinkedListNode', () => {
  describe('connect', () => {
    test('should set the next value for the node', () => {
      const node = new LinkedListNode(1);
      const next = new LinkedListNode(2);
      node.connect(next);
      expect(node.next).toBe(next);
    });
  });
});
