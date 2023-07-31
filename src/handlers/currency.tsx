import { BigNumber } from "ethers";
export type AmountValue = {
  value: number;
  e: number;
};
function belowZero(value: number): AmountValue {
  if (value < 1) {
    var x = value;
    var e = 1;
    while (x < 1) {
      x = x * 10;
      e = e * 10;
    }
    console.log({
      x: x,
      e: e,
    });
    return {
      value: value,
      e: e,
    };
  }
  return {
    value: value,
    e: 1,
  };
}
export const CurrencyHandler ={
    belowZero,
}
