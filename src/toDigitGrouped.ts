/**
 * Use thousand separator (or custom text) to group digits in a string.
 */
export default function toDigitGrouped(
  value: string | number,
  {
    digitCharacters = '0123456789',
    groupSize = 3,
    groupSeparator = ' ',
    decimalSeparator = '.',
    groupFractions = false,
    multiple = false,
  }: {
    digitCharacters?: string;
    groupSize?: number;
    groupSeparator?: string;
    decimalSeparator?: string;
    groupFractions?: boolean;
    multiple?: boolean;
  } = {}
): string {
  const v = value.toString();
  if (groupSize <= 0) {
    return v;
  }

  let ret = '';
  let afterDecimal = false;
  let afterDigits = false;
  let digits = '';

  const appendDigits = (): void => {
    if (!digits) {
      return;
    }
    let b = '';

    if (afterDecimal && groupFractions) {
      let p = 0;
      let q = groupSize;
      while (p < digits.length) {
        b += digits.slice(p, q);
        if (q < digits.length - 1) {
          b += groupSeparator;
        }
        p += groupSize;
        q += groupSize;
      }
    } else if (afterDecimal) {
      b = digits;
    } else {
      let p = digits.length - groupSize;
      let q = digits.length;
      while (q >= 0) {
        b = digits.slice(Math.max(p, 0), q) + b;
        if (p > 0) {
          b = groupSeparator + b;
        }
        p -= groupSize;
        q -= groupSize;
      }
    }

    ret += b;
    digits = '';
  };

  for (let i = 0; i < v.length; i++) {
    const c = v[i];
    if (c == decimalSeparator) {
      appendDigits();
      ret += c;
      afterDecimal = true;
    } else if (digitCharacters.includes(c)) {
      digits += c;
      afterDigits = true;
    } else {
      if (afterDigits && multiple) {
        appendDigits();
        afterDigits = false
        afterDecimal = false
        ret += c;
      } else if (afterDigits) {
        appendDigits();
        ret += v.slice(i);
        break;
      } else {
        ret += c;
      }
    }
  }
  appendDigits();

  return ret;
}
