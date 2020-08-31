# @sunpietro/color-finder

Checks the distance between 2 hex colors and finds the closest color to a given sample.

## Installation

```
npm install @sunpietro/color-finder
```

## How to use it?

```
import ColorFinder from `@sunpietro/color-finder`;

const colorsLibrary = [
  '#bb3300',
  '#aa22ff',
  '#b00053'
];
const finder = ColorFinder(colorsLibrary);
```

## Available methods

There are finder methods available:

### `updateColorsLibrary`

Updates a collection of colors used for comparing with sample colors. Takes one param: `colors` as `string[]`.

### `findClosestColor`

Finds the closest color to a sample color, in a colors library. Takes one param: `color` as `string`. Returns the closest color as `string`.

### `checkColorsSimilarity`

Compares 2 hex colors in terms of color similarity. Takes two params: `color1` as `string` and `color2` as `string`. Returns an Euclidean distance value as `number`. The lowest value, the more similar colors are.
