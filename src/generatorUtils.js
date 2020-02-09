function* THE_GENERATOR() {} // eslint-disable-line no-empty-function

export const isGenerator = (value) => {
  if (typeof value !== 'function') {
    return false;
  }
  return value.constructor === THE_GENERATOR.constructor;
};

export const rehydrate = (generator, iterations) => iterations.reduce((gen, args) => {
  gen.next(...args);
  return gen;
}, generator());
