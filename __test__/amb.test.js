import { solve, amb, required } from '..';

it('should solve primitive problems', () => {
  function* task() {
    const a = yield amb(1, 2, 3, 4, 5);
    const b = yield amb(1, 2, 3, 4, 5);
    yield required(a < b);
    yield required(b !== 3);

    return [a, b];
  }

  expect(solve(task)).toEqual([
    [1, 2],
    [1, 4],
    [1, 5],
    [2, 4],
    [2, 5],
    [3, 4],
    [3, 5],
    [4, 5],
  ]);
});
