import { DominoSide } from './DominoSide';

const FROM_REGEX = /^([0-9]|10|11|12)x([0-9]|10|11|12)$/;

export class Domino {
  sides: [DominoSide, DominoSide];

  static from(str: string): Domino {
    if (!str.match(FROM_REGEX)) {
      throw new Error('Does not match required format');
    }
    const [a, b] = str.split('x');
    return new Domino([Number(a), Number(b)]);
  }

  constructor(sides: [DominoSide, DominoSide]) {
    this.sides = sides;
  }

  get value(): number {
    return this.sides[0] + this.sides[1];
  }

  get isDouble(): boolean {
    return this.sides[0] === this.sides[1];
  }

  canPair(other: Domino): boolean {
    return (
      this.sides[0] === other.sides[0] ||
      this.sides[0] === other.sides[1] ||
      this.sides[1] === other.sides[0] ||
      this.sides[1] === other.sides[1]
    );
  }

  getOtherSide(side: DominoSide): DominoSide {
    const other = this.sides[0] === side ? this.sides[1] : this.sides[1] === side ? this.sides[0] : null;
    if (other === null) {
      throw new Error(`No matching side provided`);
    }
    return other;
  }

  toString(): string {
    return this.sides.join('x');
  }
}
