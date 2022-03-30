export const moneyFormatter = (
  amount = 0,
  countryCode = 'en-US',
  formatOption = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }
) => {
  const formatter = new Intl.NumberFormat(countryCode, formatOption);
  return formatter.format(amount);
};

export const sanitizeNumber = (number) => {
  return number.replace(/(\.0+|0+)$/, '');
}
