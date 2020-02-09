class Amb {
  constructor(values) {
    this.values = values;

    this.generator = function* iterator() {
      for (const value of this.values) { // eslint-disable-line no-restricted-syntax
        yield value;
      }
    };
    this[Symbol.iterator] = this.generator;
  }

  toArray() {
    return [...this.values];
  }

  toGenerator() {
    return this.generator();
  }
}

export const amb = (values) => new Amb(values);

export const isAmb = (exp) => exp instanceof Amb;
