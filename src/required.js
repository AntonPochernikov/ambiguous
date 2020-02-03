import { REQUIRED_SYMBOL } from './constants';

export const required = (predicate) => {
  return {
    value: !!predicate,
    [REQUIRED_SYMBOL]: true,
  };
};

export const isRequired = exp => typeof exp === 'object' && exp[REQUIRED_SYMBOL];

export const requiredValue = req => req.value;
