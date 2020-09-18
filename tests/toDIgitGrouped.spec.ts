import { assert } from 'chai';
import toDigitGrouped from '../src/toDigitGrouped';

describe('toDigitGrouped', function() {
  it('simple', function() {
    for (const [value, expected] of [
      ['000000', '000 000'],
      ['', ''],
      ['NaN', 'NaN'],
      ['1234.56', '1 234.56'],
      ['-123', '-123'],
      ['197239812731927389021', '197 239 812 731 927 389 021'],
      ['1.12310287497571983', '1.12310287497571983'],
      ['1e+10', '1e+10'],
      ['1e+123123123', '1e+123123123'],
      ['foobar10124870123foobar123123', 'foobar10 124 870 123foobar123123'],
    ]) {
      assert.equal(toDigitGrouped(value), expected);
    }
  });
  it('multiple', function() {
    for (const [value, expected] of [
      ['foo 1234 and 4567 bar', 'foo 1 234 and 4 567 bar'],
      ['000000', '000 000'],
      ['', ''],
      ['NaN', 'NaN'],
      ['1234.56', '1 234.56'],
      ['-123', '-123'],
      ['197239812731927389021', '197 239 812 731 927 389 021'],
      ['1.12310287497571983', '1.12310287497571983'],
      ['1e+10', '1e+10'],
      ['1e+123123123', '1e+123 123 123'],
      ['foobar10124870123foobar123 123', 'foobar10 124 870 123foobar123 123'],
    ]) {
      assert.equal(toDigitGrouped(value, {multiple: true}), expected);
    }
  });
  it('decimal separator', function() {
    for (const [value, expected] of [
      ['000000', '000 000'],
      ['', ''],
      ['NaN', 'NaN'],
      ['1234,56', '1 234,56'],
      ['-123', '-123'],
      ['197239812731927389021', '197 239 812 731 927 389 021'],
      ['1,12310287497571983', '1,12310287497571983'],
      ['1e+10', '1e+10'],
      ['1e+123123123', '1e+123123123'],
      ['foobar10124870123foobar123123', 'foobar10 124 870 123foobar123123'],
    ]) {
      assert.equal(toDigitGrouped(value, { decimalSeparator: ',' }), expected);
    }
  });
  it('group separator', function() {
    for (const [value, expected] of [
      ['000000', '000,000'],
      ['', ''],
      ['NaN', 'NaN'],
      ['1234.56', '1,234.56'],
      ['-123', '-123'],
      ['197239812731927389021', '197,239,812,731,927,389,021'],
      ['1.12310287497571983', '1.12310287497571983'],
      ['1e+10', '1e+10'],
      ['1e+123123123', '1e+123123123'],
      ['foobar10124870123foobar123123', 'foobar10,124,870,123foobar123123'],
    ]) {
      assert.equal(
        toDigitGrouped(value, {
          groupSeparator: ',',
        }),
        expected
      );
    }
  });
  it('group fraction', function() {
    for (const [value, expected] of [
      ['1.12310287497571983', '1.123 102 874 975 719 83'],
      ['1231231.12', '1 231 231.12'],
      ['000000', '000 000'],
      ['', ''],
      ['NaN', 'NaN'],
      ['1234.56', '1 234.56'],
      ['-123', '-123'],
      ['197239812731927389021', '197 239 812 731 927 389 021'],
      ['1e+10', '1e+10'],
      ['1e+123123123', '1e+123123123'],
      [
        'foobar10124870123.123123foobar123123',
        'foobar10 124 870 123.123 123foobar123123',
      ],
    ]) {
      assert.equal(toDigitGrouped(value, { groupFractions: true }), expected);
    }
  });
  it('group size 4', function() {
    for (const [value, expected] of [
      ['1231231.12', '123 1231.12'],
      ['000000', '00 0000'],
      ['', ''],
      ['NaN', 'NaN'],
      ['1234.56', '1234.56'],
      ['-123', '-123'],
      ['197239812731927389021', '1 9723 9812 7319 2738 9021'],
      ['1e+10', '1e+10'],
      ['1e+123123123', '1e+123123123'],
      [
        'foobar10124870123.123123foobar123123',
        'foobar101 2487 0123.123123foobar123123',
      ],
    ]) {
      assert.equal(toDigitGrouped(value, { groupSize: 4 }), expected);
    }
  });
  it('digit characters hex', function() {
    for (const [value, expected] of [
      ['0caff12dff21e984', '0c af f1 2d ff 21 e9 84'],
      ['0caff12dff21e984s00000', '0c af f1 2d ff 21 e9 84s00000'],
    ]) {
      assert.equal(toDigitGrouped(value, { digitCharacters: "0123456789abcdef", groupSize: 2 }), expected);
    }
  });
});
