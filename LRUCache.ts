class TNode {
  key: number;
  value: number;
  prev: TNode | null = null;
  next: TNode | null = null;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
  }
}

class LRUCache {
  private capacity: number;
  private cache: Map<number, TNode>;

  private left: TNode;
  private right: TNode;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();

    this.left = new TNode(0, 0);
    this.right = new TNode(0, 0);
    this.left.next = this.right;
    this.right.prev = this.left;
  }

  /**
   * get value of cache by key, when get the value, update most resent.
   * @param key
   * @returns
   */
  get(key: number): number {
    if (!this.cache.has(key)) {
      return -1;
    }

    const node = this.cache.get(key)!;
    this.remove(node);
    this.insert(node);

    return node.value;
  }


  /**
   * insert new  cache or update the cache, update most resent
   */
  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.remove(this.cache.get(key)!);
    }

    if (this.cache.size === this.capacity) {
      this.cache.delete(this.left.next!.key);
      this.remove(this.left.next!);
    }

    const newNode = new TNode(key, value);
    this.cache.set(key, newNode);
    this.insert(newNode);
  }

  private remove(node: TNode): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private insert(node: TNode): void {
    node.prev = this.right.prev;
    node.next = this.right;
    this.right.prev!.next = node;
    this.right.prev = node;

  }
}

// example
const example = new LRUCache(2);
example.put(1, 1);
example.put(2, 2);
example.get(1);
example.put(3, 3)
console.log(example.get(2))


