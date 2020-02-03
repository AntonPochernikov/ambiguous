import { isAmb, ambValues } from './amb';
import { isRequired, requiredValue } from './required';
import flatmap from './flatmap';
import { isGenerator, rehydrate } from './generatorUtils';

export default function solve(generator, ...args) {
  if (!isGenerator(generator)) {
    throw new Error(
      `Argument must be a generator function but it was: ${typeof generator}: SOLVE`,
    );
  }

  const iter = (gen, prevSteps, currentStep) => {
    const { value, done } = gen.next(...currentStep);

    if (done) {
      return [value];
    }

    if (isRequired(value) && !requiredValue(value)) {
      return [];
    }

    if (isAmb(value)) {
      const values = ambValues(value);
      return flatmap(
        current => iter(
          rehydrate(generator, [...prevSteps, currentStep], args),
          [...prevSteps, currentStep],
          [current],
        ),
        values,
      );
    }

    return iter(gen, prevSteps, []);
  };

  return iter(generator(), [], args);
}
