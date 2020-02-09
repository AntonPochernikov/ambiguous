import { solve, amb, required } from '..';

it('should have a single answer', () => {
  expect(
    [...solve(function* () {})],
  ).toEqual([undefined]);

  function* task() {
    yield required(true);

    return false;
  }

  expect(
    [...solve(task)],
  ).toEqual([false]);
});

it('shouldn\'t have a single answer', () => {
  function* task() {
    const a = yield amb([1, 2]);
    const b = yield amb([]);

    return [a, b];
  }

  expect(
    [...solve(task)],
  ).toEqual([]);

  function* task2() {
    yield required(false);

    return false;
  }

  expect(
    [...solve(task2)],
  ).toEqual([]);
});

it('should yield all combinations', () => {
  function* task() {
    const a = yield amb([1, 2]);
    const b = yield amb([1, 2]);

    return [a, b];
  }

  expect([...solve(task)]).toEqual([
    [1, 1],
    [1, 2],
    [2, 1],
    [2, 2],
  ]);
});

it('should solve primitive problem', () => {
  function* task() {
    const a = yield amb([1, 2, 3, 4, 5]);
    const b = yield amb([1, 2, 3, 4, 5]);
    yield required(a < b);
    yield required(b !== 3);

    return [a, b];
  }

  expect([...solve(task)]).toEqual([
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

it('should solve multiple dwelling', () => {
  const floors = [1, 2, 3, 4, 5];
  const areDistinct = ([first, ...rest]) => {
    if (rest.length === 0) {
      return true;
    }
    if (rest.find(item => item === first)) {
      return false;
    }
    return areDistinct(rest);
  };

  function* task() {
    const baker = yield amb(floors);
    const cooper = yield amb(floors);
    const fletcher = yield amb(floors);
    const miller = yield amb(floors);
    const smith = yield amb(floors);

    yield required(areDistinct([baker, cooper, fletcher, miller, smith]));
    yield required(baker !== 5);
    yield required(cooper !== 1);
    yield required(fletcher !== 1 && fletcher !== 5);
    yield required(miller > cooper);
    yield required(Math.abs(smith - fletcher) !== 1);
    yield required(Math.abs(fletcher - cooper) !== 1);

    return { baker, cooper, fletcher, miller, smith };
  }

  expect([...solve(task)]).toEqual([{
    baker: 3,
    cooper: 2,
    fletcher: 4,
    miller: 5,
    smith: 1,
  }]);
});
