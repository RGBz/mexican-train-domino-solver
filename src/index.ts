import { Domino } from './Domino';
import { Graph } from './Graph';

if (process.argv.length !== 4) {
  throw new Error('Must specify a comma separated list of dominos and the side to start with. e.g.: 1x2,3x4,2x3 3');
}

console.log(
  Graph.findLongestPath(process.argv[2].split(',').map(Domino.from), Number(process.argv[3]))
    .map((domino) => domino.toString())
    .join('\n'),
);
