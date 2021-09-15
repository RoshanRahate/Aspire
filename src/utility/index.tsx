
/**
 * Currency formatter with comma separator
 * @param value - NUmber value
 * @returns formatted string
 */
export const currencyFormatter = value => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
