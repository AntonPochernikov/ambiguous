import { amb, isAmb } from '../amb';

test('isAmb', () => {
  expect(
    isAmb(amb([])),
  ).toBeTruthy();
});

test('amb', () => {
  expect([...amb([])]).toEqual([]);
  expect([...amb([1, 2, 3])]).toEqual([1, 2, 3]);
});
