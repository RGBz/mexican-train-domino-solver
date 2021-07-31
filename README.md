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