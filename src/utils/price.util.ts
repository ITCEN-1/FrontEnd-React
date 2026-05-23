const ONE_HUNDRED_MILLION = 10000;

// price로 들어오는 숫자의 단위는 만원입니다.
export function parsePriceToOutput(price: number) {
  const oneHundredMillion = Math.floor(price / ONE_HUNDRED_MILLION);
  const tenMillion = Math.floor(price % ONE_HUNDRED_MILLION);
  let output = "";

  if (oneHundredMillion > 0) output += `${oneHundredMillion}억`;
  if (tenMillion > 0) output += ` ${tenMillion}만원`;
  return output;
}
