import { BigNumber } from 'bignumber.js';

const sixDecimalsFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 6,
});

export function urlIPFSAsset(hash: string) {
  return `${process.env.REACT_APP_IPFS_URL}${hash}`;
}

export function truncateAddressString(address: string, num = 12) {
  if (!address) {
    return '';
  }

  const first = address.slice(0, num);
  const last = address.slice(-num);
  return `${first}...${last}`;
}

export function formatWithSixDecimals(value: number | string) {
  return sixDecimalsFormatter.format(Number(value));
}

export const divDecimals = (amount: string | number, decimals: string | number) => {
  if (decimals === 0) {
    return String(amount);
  }

  const decimalsMul = `10${new Array(Number(decimals)).join('0')}`;
  const amountStr = new BigNumber(amount).dividedBy(decimalsMul);

  return amountStr.toFixed();
};

