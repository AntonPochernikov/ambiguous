import { AMB_SYMBOL } from './constants';

export const amb = (...values) => {
  return {
    values,
    [AMB_SYMBOL]: true,
  };
};

export const isAmb = exp => typeof exp === 'object' && exp[AMB_SYMBOL];

export const ambValues = amb => amb.values;
