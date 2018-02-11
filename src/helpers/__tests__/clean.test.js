import clean from '../clean';

describe.only('clean', () => {
  test('removes whitespaces from both ends', () => {
    expect(clean('\t\n\n\t and \t\t\t\n\n'))
      .toBe('and');
  });

  test('converts to lower case', () => {
    expect(clean('BIG FisH'))
      .toBe('big fish');
  });

  test('removes multiple whitespaces inside text', () => {
    expect(clean('the\tquick\nbrown    fox'))
      .toBe('the quick brown fox');
  });

  test('removes special characters', () => {
    expect(clean('12 日本語 ~ !?słowo?! Русский <>//'))
      .toBe('12 日本語 słowo русский');
  });
});
