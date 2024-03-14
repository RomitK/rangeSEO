import numeral from 'numeral';

export const priceShortFormat = (value) => {
  const formattedValue = numeral(value).format('0.00a');
  const suffix = formattedValue.charAt(formattedValue.length - 1);
  
  if (suffix === 'K' || suffix === 'M' || suffix === 'B' || suffix === 'T') {
    return formattedValue.toUpperCase().replace('K', 'K').replace('M', 'M').replace('B', 'B').replace('T', 'T');
  } else {
    return formattedValue.replace('.00', '').toUpperCase().replace('K', 'K').replace('M', 'M').replace('B', 'B').replace('T', 'T');; // Remove decimal part if it's .00
  }
};