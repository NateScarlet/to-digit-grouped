# To Digit Grouped

[![build status](https://github.com/NateScarlet/to-digit-grouped/workflows/Node%20CI/badge.svg)](https://github.com/NateScarlet/to-digit-grouped/actions)
[![npm package](https://img.shields.io/npm/v/to-digit-grouped)](https://www.npmjs.com/package/to-digit-grouped)

Use thousand separator (or custom text) to group digits in a string.

```javascript
import toDigitGrouped from 'to-digit-grouped';

toDigitGrouped('1234567890.1234567890');
// "1 234 567 890.1234567890"

toDigitGrouped('value: 1234567890.1234567890 unit');
// "value: 1 234 567 890.1234567890 unit"

toDigitGrouped('1234 and 5678');
// 1 234 and 5678

toDigitGrouped('1234 and 5678', { multiple: true });
// 1 234 and 5 678

toDigitGrouped('1234567890.1234567890');
// "1 234 567 890.1234567890"

toDigitGrouped('1234567890.1234567890', { groupFraction: true });
// "1 234 567 890.123 456 789 0"

toDigitGrouped('1234567890.1234567890', { groupSeparator: ',' });
// "1,234,567,890.1234567890"

toDigitGrouped('1234567890.1234567890', { groupSize: 4 });
// "12 3456 7890.1234567890"

toDigitGrouped('1234567890,1234567890', { decimalSeparator: ',' });
// "1 234 567 890,1234567890"

toDigitGrouped('0123456789abcdef', {
  digitCharacters: '0123456789abcdef',
  groupSize: 2,
});
// "01 23 45 67 89 ab cd ef"
```
