import { isAmb, amb } from './amb';
import { isRequired, requiredValue } from './required';
import { isGenerator, rehydrate } from './generatorUtils';

export default function solve(generator, ...argmnts) {
  if (!isGenerator(generator)) {
    throw new Error(
      `Argument must be a generator function but it was: ${typeof generator}: SOLVE`,
    );
  }

  function* iterator() {
    const steps = [];
    let args = argmnts;
    let gen = generator();

    const backTrack = () => {
      if (steps.length === 0) {
        return false;
      }

      const { iter, isRequirement } = steps.pop();
      if (isRequirement) {
        return backTrack();
      }

      const { value, done } = iter.next();
      if (done) {
        return backTrack();
      }

      gen = rehydrate(
        generator,
        [argmnts, ...steps.map(({ prev }) => ([prev]))],
      );
      steps.push({ iter, prev: value });
      args = [value];

      return true;
    };

    while (true) {
      const { value, done } = gen.next(...args);
      // console.log('===============================================');
      // console.log('args:', args);
      // console.log('value:', value);
      // console.log('done:', done);
      // console.log('steps:', steps);

      if (done) {
        yield value;

        if (steps.length === 0) {
          return;
        }

        const success = backTrack();

        if (!success) {
          return;
        }

        continue;
      }

      if (isRequired(value)) {
        if (!requiredValue(value)) {
          if (steps.length === 0) {
            return;
          }

          const success = backTrack();

          if (!success) {
            return;
          }

          continue;
        }

        args = [true];
        steps.push({ isRequirement: true, prev: true });
        continue;
      }

      if (isAmb(value)) {
        const ambGen = value.toGenerator();
        const { value: ambValue, done: ambDone } = ambGen.next();

        if (ambDone) {
          const success = backTrack();

          if (!success) {
            return;
          }

          continue;
        }

        args = [ambValue];
        steps.push({ iter: ambGen, prev: ambValue });
      }
    }
  }

  return amb(iterator());
}
