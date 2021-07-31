import { Domino } from './Domino';

export function findMostValuableChain(chains: Domino[][]): Domino[] {
  if (chains.length === 0) {
    return [];
  }
  return chains.sort(compareChains)[0];
}

function compareChains(a: Domino[], b: Domino[]): number {
  if (a.length === b.length && a.length > 0) {
    const aValue = valueChain(a);
    const bValue = valueChain(b);
    if (aValue === bValue) {
      if (a[a.length - 1].isDouble) {
        return 1;
      } else if (b[b.length - 1].isDouble) {
        return -1;
      }
      return 0;
    }
    return bValue - aValue;
  }
  return b.length - a.length;
}

function valueChain(dominoes: Domino[]): number {
  return dominoes.reduce((sum, domino) => sum + domino.value, 0);
}
