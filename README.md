# Mexican Train Dominoes Solver
Playing Mexican Train Dominoes and want to find the optimal chain to start with?

Well here you go.

## Quick Start
```sh
# install the dependencies (mainly TypeScript to build the code)
npm i

# Type in your dominoes and the side you need to connect them to
npm start 1x2,2x3,5x6,7x8,11x12,10x1,9x8,3x4,5x4,8x4,9x7,5x7 10
```

### Details
- Dominoes are represented with the numbered sides separated by an 'x'. e.g.: 1x2 or 10x11
- The first argument to the program must be a comma separated list of dominoes
- The second argument must be the number for the side you're trying to connect to

### How's it work?
This program uses a lazy algorithm to traverse all possible chains given a sequence of dominoes starting from the specified side.

The algorithm has three phases:
1. Find all possible "graphs" for the chain of dominoes. A "graph" in this case is a directed graph from each domino to every other possible domino it could be paired to.
2. Traverse all possible paths for each generated graph starting from the specified side.
3. Return the longest path found from all the paths we've generated.

The graph is represented as a map of side values to all the dominoes that contain that side.